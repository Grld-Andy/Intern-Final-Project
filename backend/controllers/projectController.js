import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();
// Testing the db connection
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});


// Create a new project with all related data
const createProject = async (req, res) => {
    const { title, description, projectFeatures, improvementAreas, developmentStack, contributors, linkedDocs } = req.body;
    const coverPhoto = req.files?.coverPhoto?.[0];
    const technicalDetailsVideo = req.files?.technicalDetailsVideo?.[0];

    try {
        if (!coverPhoto || !technicalDetailsVideo) {
            console.error('Missing files:', { coverPhoto, technicalDetailsVideo });
            return res.status(400).json({ error: 'Invalid image file' });
        }

        let parsedProjectFeatures = projectFeatures;
        if (typeof projectFeatures === 'string') {
            parsedProjectFeatures = JSON.parse(projectFeatures);
        }

        let parsedImprovementAreas = improvementAreas;
        if (typeof improvementAreas === 'string') {
            parsedImprovementAreas = JSON.parse(improvementAreas);
        }

        let parsedDevelopmentStack = developmentStack;
        if (typeof developmentStack === 'string') {
            parsedDevelopmentStack = JSON.parse(developmentStack);
        }

        let parsedContributors = contributors;
        if (typeof contributors === 'string') {
            parsedContributors = JSON.parse(contributors);
        }

        if (!parsedProjectFeatures || !Array.isArray(parsedProjectFeatures) || parsedProjectFeatures.some(f => !f.featureName)) {
            console.error('Invalid project features:', parsedProjectFeatures);
            return res.status(400).json({ error: 'Invalid project features' });
        }

        if (!parsedImprovementAreas || !Array.isArray(parsedImprovementAreas) || parsedImprovementAreas.some(a => !a.areaName)) {
            console.error('Invalid improvement areas:', parsedImprovementAreas);
            return res.status(400).json({ error: 'Invalid improvement areas' });
        }

        if (!parsedDevelopmentStack || !Array.isArray(parsedDevelopmentStack) || parsedDevelopmentStack.some(s => !s.stackName)) {
            console.error('Invalid development stack:', parsedDevelopmentStack);
            return res.status(400).json({ error: 'Invalid development stack' });
        }

        if (!parsedContributors || !Array.isArray(parsedContributors) || parsedContributors.some(c => !c.userId || !c.role)) {
            console.error('Invalid contributors:', parsedContributors);
            return res.status(400).json({ error: 'Invalid contributors' });
        }

        await db.query('BEGIN');

        let coverPhotoUrl = null;
        if (coverPhoto) {
            const coverPhotoResult = await cloudinary.uploader.upload(coverPhoto.path, {
                folder: 'projects/cover_photos'
            });
            coverPhotoUrl = coverPhotoResult.secure_url;
            console.log("Cover Photo Result: ", coverPhotoResult);
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
            console.log("Technical Details Video Result: ", technicalDetailsVideoResult);
            technicalDetailsVideoUrl = technicalDetailsVideoResult.secure_url;
            console.log("Technical Details Video URL: ", technicalDetailsVideoUrl);
        }

        const projectResult = await db.query(
            'INSERT INTO Project (title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, coverPhotoUrl, technicalDetailsVideoUrl, linkedDocs]
        );
        const projectId = projectResult.rows[0].id;

        for (const feature of parsedProjectFeatures) {
            await db.query(
                'INSERT INTO ProjectFeature (projectId, featureName, description) VALUES ($1, $2, $3)',
                [projectId, feature.featureName, feature.description]
            );
        }

        for (const area of parsedImprovementAreas) {
            await db.query(
                'INSERT INTO ImprovementArea (projectId, areaName, description) VALUES ($1, $2, $3)',
                [projectId, area.areaName, area.description]
            );
        }

        for (const stack of parsedDevelopmentStack) {
            const stackResult = await db.query(
                'INSERT INTO DevelopmentStack (stackName, description) VALUES ($1, $2) RETURNING *',
                [stack.stackName, stack.description]
            );
            const stackId = stackResult.rows[0].id;
            await db.query(
                'INSERT INTO ProjectStack (projectId, stackId) VALUES ($1, $2)',
                [projectId, stackId]
            );
        }

        for (const contributor of parsedContributors) {
            await db.query(
                'INSERT INTO ProjectContributor (projectId, userId, role) VALUES ($1, $2, $3)',
                [projectId, contributor.userId, contributor.role]
            );
        }

        await db.query('COMMIT');
        res.status(201).json(projectResult.rows[0]);
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error creating project:', err);
        res.status(500).json({ error: err.message });
    }
}

// Get all projects with related data
const getProjects = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                p.id, p.title, p.description, p.coverPhotoUrl, p.technicalDetailsVideo, p.linkedDocs, p.createdAt, p.updatedAt,
                json_agg(DISTINCT jsonb_build_object('id', pf.id, 'featureName', pf.featureName, 'description', pf.description)) AS projectFeatures,
                json_agg(DISTINCT jsonb_build_object('id', ia.id, 'areaName', ia.areaName, 'description', ia.description)) AS improvementAreas,
                json_agg(DISTINCT jsonb_build_object('id', ds.id, 'stackName', ds.stackName, 'description', ds.description)) AS developmentStack,
                json_agg(DISTINCT jsonb_build_object('id', pc.id, 'userId', pc.userId, 'role', pc.role)) AS contributors
            FROM Project p
            LEFT JOIN ProjectFeature pf ON p.id = pf.projectId
            LEFT JOIN ImprovementArea ia ON p.id = ia.projectId
            LEFT JOIN ProjectStack ps ON p.id = ps.projectId
            LEFT JOIN DevelopmentStack ds ON ps.stackId = ds.id
            LEFT JOIN ProjectContributor pc ON p.id = pc.projectId
            GROUP BY p.id
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Get a single project by ID with related data
const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`
            SELECT
                p.id, p.title, p.description, p.coverPhotoUrl, p.technicalDetailsVideo, p.linkedDocs, p.createdAt, p.updatedAt,
                json_agg(DISTINCT jsonb_build_object('id', pf.id, 'featureName', pf.featureName, 'description', pf.description)) AS projectFeatures,
                json_agg(DISTINCT jsonb_build_object('id', ia.id, 'areaName', ia.areaName, 'description', ia.description)) AS improvementAreas,
                json_agg(DISTINCT jsonb_build_object('id', ds.id, 'stackName', ds.stackName, 'description', ds.description)) AS developmentStack,
                json_agg(DISTINCT jsonb_build_object('id', pc.id, 'userId', pc.userId, 'role', pc.role)) AS contributors
            FROM Project p
            LEFT JOIN ProjectFeature pf ON p.id = pf.projectId
            LEFT JOIN ImprovementArea ia ON p.id = ia.projectId
            LEFT JOIN ProjectStack ps ON p.id = ps.projectId
            LEFT JOIN DevelopmentStack ds ON ps.stackId = ds.id
            LEFT JOIN ProjectContributor pc ON p.id = pc.projectId
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Update a project by ID with related data
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, coverPhotoUrl, technicalDetailsVideo, projectFeatures, improvementAreas, developmentStack, contributors, linkedDocs } = req.body;
    try {
        await db.query('BEGIN');

        const projectResult = await db.query(
            'UPDATE Project SET title = $1, description = $2, coverPhotoUrl = $3, technicalDetailsVideo = $4, linkedDocs = $5, updatedAt = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs, id]
        );

        await db.query('DELETE FROM ProjectFeature WHERE projectId = $1', [id]);
        for (const feature of projectFeatures) {
            await db.query(
                'INSERT INTO ProjectFeature (projectId, featureName, description) VALUES ($1, $2, $3)',
                [id, feature.featureName, feature.description]
            );
        }

        await db.query('DELETE FROM ImprovementArea WHERE projectId = $1', [id]);
        for (const area of improvementAreas) {
            await db.query(
                'INSERT INTO ImprovementArea (projectId, areaName, description) VALUES ($1, $2, $3)',
                [id, area.areaName, area.description]
            );
        }

        await db.query('DELETE FROM ProjectStack WHERE projectId = $1', [id]);
        for (const stack of developmentStack) {
            const stackResult = await db.query(
                'INSERT INTO DevelopmentStack (stackName, description) VALUES ($1, $2) RETURNING *',
                [stack.stackName, stack.description]
            );
            const stackId = stackResult.rows[0].id;
            await db.query(
                'INSERT INTO ProjectStack (projectId, stackId) VALUES ($1, $2)',
                [id, stackId]
            );
        }

        await db.query('DELETE FROM ProjectContributor WHERE projectId = $1', [id]);
        for (const contributor of contributors) {
            await db.query(
                'INSERT INTO ProjectContributor (projectId, userId, role) VALUES ($1, $2, $3)',
                [id, contributor.userId, contributor.role]
            );
        }

        await db.query('COMMIT');
        res.status(200).json(projectResult.rows[0]);
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
}

// Delete a project by ID with related data
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('BEGIN');

        await db.query('DELETE FROM ProjectFeature WHERE projectId = $1', [id]);
        await db.query('DELETE FROM ImprovementArea WHERE projectId = $1', [id]);
        await db.query('DELETE FROM ProjectStack WHERE projectId = $1', [id]);
        await db.query('DELETE FROM ProjectContributor WHERE projectId = $1', [id]);
        const projectResult = await db.query('DELETE FROM Project WHERE id = $1 RETURNING *', [id]);

        await db.query('COMMIT');
        if (projectResult.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
}


// Create a new demo request
const createDemoRequest = async (req, res) => {
    const { projectId, fullName, emailAddress, requestDate, requestTime, comments, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO DemoRequest (projectId, fullName, emailAddress, requestDate, requestTime, comments, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [projectId, fullName, emailAddress, requestDate, requestTime, comments, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all demo requests
const getDemoRequests = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM DemoRequest');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Update the status of a demo request by ID
const updateDemoRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await db.query(
            'UPDATE DemoRequest SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Demo request not found' });
        }
        res.status(200).json(result.rows[0]);
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