import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const pool = new pg.Pool({
    user: process.env.REMOTE_DB_USER,
    host: process.env.REMOTE_DB_HOST,
    database: process.env.REMOTE_DB_DATABASE,
    password: process.env.REMOTE_DB_PASSWORD,
    port: process.env.REMOTE_DB_PORT
});


const toCamelCase = (str) => {
    return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

const keysToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            result[toCamelCase(key)] = keysToCamelCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
};

// Create a new project with related data
const createProject = async (req, res) => {
    const { title, description, projectFeatures, improvementAreas, developmentStack, linkedDocs } = req.body;
    const coverPhoto = req.files?.coverPhoto?.[0];
    const technicalDetailsVideo = req.files?.technicalDetailsVideo?.[0];

    const client = await pool.connect();
    try {
        if (!coverPhoto || !technicalDetailsVideo) {
            return res.status(400).json({ error: 'Missing required files' });
        }

        await client.query('BEGIN');

        let coverPhotoUrl = null;
        if (coverPhoto) {
            const coverPhotoResult = await cloudinary.uploader.upload(coverPhoto.path, {
                folder: 'projects/cover_photos'
            });
            coverPhotoUrl = coverPhotoResult.secure_url;
        }

        let technicalDetailsVideoUrl = null;
        if (technicalDetailsVideo) {
            const technicalDetailsVideoResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_large(technicalDetailsVideo.path, {
                    resource_type: 'video',
                    folder: 'projects/technical_videos'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            technicalDetailsVideoUrl = technicalDetailsVideoResult.secure_url;
        }

        const projectResult = await client.query(
            'INSERT INTO Project (title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, coverPhotoUrl, technicalDetailsVideoUrl, linkedDocs]
        );
        const projectId = projectResult.rows[0].id;

        const parsedProjectFeatures = projectFeatures ? JSON.parse(projectFeatures) : [];
        const projectFeaturesResult = [];
        for (const feature of parsedProjectFeatures) {
            const result = await client.query(
                'INSERT INTO ProjectFeature (projectId, featureName) VALUES ($1, $2) RETURNING *',
                [projectId, feature.featureName]
            );
            projectFeaturesResult.push(result.rows[0]);
        }

        const parsedImprovementAreas = improvementAreas ? JSON.parse(improvementAreas) : [];
        const improvementAreasResult = [];
        for (const area of parsedImprovementAreas) {
            const result = await client.query(
                'INSERT INTO ImprovementArea (projectId, areaName) VALUES ($1, $2) RETURNING *',
                [projectId, area.areaName]
            );
            improvementAreasResult.push(result.rows[0]);
        }

        const parsedDevelopmentStack = developmentStack ? JSON.parse(developmentStack) : [];
        const developmentStackResult = [];
        for (const stack of parsedDevelopmentStack) {
            const result = await client.query(
                'INSERT INTO DevelopmentStack (projectId, stackName) VALUES ($1, $2) RETURNING *',
                [projectId, stack.stackName]
            );
            developmentStackResult.push(result.rows[0]);
        }

        await client.query('COMMIT');
        res.status(201).json({
            project: keysToCamelCase({
                ...projectResult.rows[0],
                projectFeatures: projectFeaturesResult,
                improvementAreas: improvementAreasResult,
                developmentStack: developmentStackResult
            })
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

// Get all projects with filtering, sorting, pagination, and search by title
const getProjects = async (req, res) => {
    const { stackNames, page = 1, limit = 6, sort = 'mostRecent', title } = req.query;
    const offset = (page - 1) * limit;
    const sortOrder = sort === 'oldestFirst' ? 'ASC' : 'DESC';
    let stackFilterQuery = '';
    let titleFilterQuery = '';
    let queryParams = [limit, offset];

    if (stackNames) {
        const stackNamesArray = stackNames.split(',');
        stackFilterQuery = `
            AND p.id IN (
                SELECT projectId
                FROM DevelopmentStack
                WHERE stackName = ANY($3::text[])
            )
        `;
        queryParams.push(stackNamesArray);
    }

    if (title) {
        titleFilterQuery = `AND p.title ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${title}%`);
    }

    try {
        const query = `
            SELECT
                p.id, p.title, p.description, p.coverPhotoUrl, p.technicalDetailsVideo, p.linkedDocs, p.createdAt, p.updatedAt,
                json_agg(DISTINCT jsonb_build_object('id', pf.id, 'featureName', pf.featureName)) AS projectFeatures,
                json_agg(DISTINCT jsonb_build_object('id', ia.id, 'areaName', ia.areaName)) AS improvementAreas,
                json_agg(DISTINCT jsonb_build_object('id', ds.id, 'stackName', ds.stackName)) AS developmentStack
            FROM Project p
            LEFT JOIN ProjectFeature pf ON p.id = pf.projectId
            LEFT JOIN ImprovementArea ia ON p.id = ia.projectId
            LEFT JOIN DevelopmentStack ds ON p.id = ds.projectId
            WHERE 1=1
            ${stackFilterQuery}
            ${titleFilterQuery}
            GROUP BY p.id
            ORDER BY p.createdAt ${sortOrder}
            LIMIT $1 OFFSET $2
        `;

        const result = await pool.query(query, queryParams);
        const allProjectsResult = await pool.query('SELECT * FROM Project');
        const totalProjects = allProjectsResult.rows.length;

        res.status(200).json({
            projects: keysToCamelCase(result.rows),
            totalProjects
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a single project by ID with related data
const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT
                p.id, p.title, p.description, p.coverPhotoUrl, p.technicalDetailsVideo, p.linkedDocs, p.createdAt, p.updatedAt,
                json_agg(DISTINCT jsonb_build_object('id', pf.id, 'featureName', pf.featureName)) AS projectFeatures,
                json_agg(DISTINCT jsonb_build_object('id', ia.id, 'areaName', ia.areaName)) AS improvementAreas,
                json_agg(DISTINCT jsonb_build_object('id', ds.id, 'stackName', ds.stackName)) AS developmentStack
            FROM Project p
            LEFT JOIN ProjectFeature pf ON p.id = pf.projectId
            LEFT JOIN ImprovementArea ia ON p.id = ia.projectId
            LEFT JOIN DevelopmentStack ds ON p.id = ds.projectId
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ project: keysToCamelCase(result.rows[0]) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a project by ID with related data
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, coverPhotoUrl, technicalDetailsVideo, projectFeatures, improvementAreas, developmentStack, linkedDocs } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const projectResult = await client.query(
            'UPDATE Project SET title = $1, description = $2, coverPhotoUrl = $3, technicalDetailsVideo = $4, linkedDocs = $5, updatedAt = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs, id]
        );

        await client.query('DELETE FROM ProjectFeature WHERE projectId = $1', [id]);
        for (const feature of projectFeatures) {
            await client.query(
                'INSERT INTO ProjectFeature (projectId, featureName) VALUES ($1, $2)',
                [id, feature.featureName]
            );
        }

        await client.query('DELETE FROM ImprovementArea WHERE projectId = $1', [id]);
        for (const area of improvementAreas) {
            await client.query(
                'INSERT INTO ImprovementArea (projectId, areaName) VALUES ($1, $2)',
                [id, area.areaName]
            );
        }

        await client.query('DELETE FROM DevelopmentStack WHERE projectId = $1', [id]);
        for (const stack of developmentStack) {
            await client.query(
                'INSERT INTO DevelopmentStack (projectId, stackName) VALUES ($1, $2)',
                [id, stack.stackName]
            );
        }

        await client.query('COMMIT');
        res.status(200).json({ project: projectResult.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

// Delete a project by ID with related data
const deleteProject = async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM ProjectFeature WHERE projectId = $1', [id]);
        await client.query('DELETE FROM ImprovementArea WHERE projectId = $1', [id]);
        await client.query('DELETE FROM DevelopmentStack WHERE projectId = $1', [id]);
        const projectResult = await client.query('DELETE FROM Project WHERE id = $1 RETURNING *', [id]);

        await client.query('COMMIT');
        if (projectResult.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

// Create a new demo request
const createDemoRequest = async (req, res) => {
    const { projectId, fullName, emailAddress, requestDate, requestTime, comments } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO DemoRequest (projectId, fullName, emailAddress, requestDate, requestTime, comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [projectId, fullName, emailAddress, requestDate, requestTime, comments]
        );
        res.status(201).json({ demoRequest: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all demo requests
const getDemoRequests = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM DemoRequest ORDER BY createdAt DESC');
        res.status(200).json({ demoRequests: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update the status of a demo request by ID
const updateDemoRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE DemoRequest SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Demo request not found' });
        }
        res.status(200).json({ demoRequest: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    createDemoRequest,
    getDemoRequests,
    updateDemoRequestStatus
};