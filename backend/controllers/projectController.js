import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
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

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    return transporter.sendMail(mailOptions);
};

// Create a new project with related data
const createProject = async (req, res) => {
    const { title, description, projectFeatures, improvementAreas, developmentStack, linkedDocs, coverPhotoUrl, coverPhotoPublicId, technicalDetailsVideoUrl, technicalDetailsVideoPublicId } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const projectResult = await client.query(
            'INSERT INTO Project (title, description, coverPhotoUrl, coverPhotoPublicId, technicalDetailsVideo, technicalDetailsVideoPublicId, linkedDocs) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, coverPhotoUrl, coverPhotoPublicId, technicalDetailsVideoUrl, technicalDetailsVideoPublicId, linkedDocs]
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

// Get all projects with pagination
const getProjects = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

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
            GROUP BY p.id, p.title, p.description, p.coverPhotoUrl, p.technicalDetailsVideo, p.linkedDocs, p.createdAt, p.updatedAt
            ORDER BY p.createdAt DESC
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

        const totalProjectsResult = await pool.query('SELECT COUNT(*) FROM Project');
        const totalProjects = parseInt(totalProjectsResult.rows[0].count, 10);

        res.status(200).json({
            projects: keysToCamelCase(result.rows),
            totalProjects,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(totalProjects / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Filters and search with pagination
const filterProjects = async (req, res) => {
    try {
        const { stackNames, page = '1', limit = '6', sort = 'mostRecent', title } = req.query;
        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        const offset = (parsedPage - 1) * parsedLimit;
        const sortOrder = sort === 'oldestFirst' ? 'ASC' : 'DESC';

        let query = `
            WITH FilteredProjects AS (
                SELECT DISTINCT p.id
                FROM Project p
                WHERE 1=1
        `;

        const queryParams = [];
        const countQueryParams = [];

        if (stackNames) {
            const stackNamesArray = stackNames.split(',');
            queryParams.push(stackNamesArray);
            countQueryParams.push(stackNamesArray);
            query += `
                AND EXISTS (
                    SELECT 1
                    FROM DevelopmentStack ds
                    WHERE ds.projectId = p.id
                    AND ds.stackName = ANY($${queryParams.length}::text[])
                )
            `;
        }

        if (title) {
            queryParams.push(`%${title}%`);
            countQueryParams.push(`%${title}%`);
            query += `
                AND p.title ILIKE $${queryParams.length}
            `;
        }

        query += `
            )
            SELECT
                p.id,
                p.title,
                p.description,
                p.coverPhotoUrl,
                p.technicalDetailsVideo,
                p.linkedDocs,
                p.createdAt,
                p.updatedAt,
                COALESCE(
                    json_agg(DISTINCT jsonb_build_object(
                        'id', pf.id,
                        'featureName', pf.featureName
                    )) FILTER (WHERE pf.id IS NOT NULL),
                    '[]'::json
                ) AS projectFeatures,
                COALESCE(
                    json_agg(DISTINCT jsonb_build_object(
                        'id', ia.id,
                        'areaName', ia.areaName
                    )) FILTER (WHERE ia.id IS NOT NULL),
                    '[]'::json
                ) AS improvementAreas,
                COALESCE(
                    json_agg(DISTINCT jsonb_build_object(
                        'id', ds.id,
                        'stackName', ds.stackName
                    )) FILTER (WHERE ds.id IS NOT NULL),
                    '[]'::json
                ) AS developmentStack
            FROM FilteredProjects fp
            INNER JOIN Project p ON p.id = fp.id
            LEFT JOIN ProjectFeature pf ON p.id = pf.projectId
            LEFT JOIN ImprovementArea ia ON p.id = ia.projectId
            LEFT JOIN DevelopmentStack ds ON p.id = ds.projectId
            GROUP BY
                p.id,
                p.title,
                p.description,
                p.coverPhotoUrl,
                p.technicalDetailsVideo,
                p.linkedDocs,
                p.createdAt,
                p.updatedAt
            ORDER BY p.createdAt ${sortOrder}
            LIMIT ${parsedLimit} OFFSET ${offset}
        `;

        const result = await pool.query(query, queryParams);

        let countQuery = `
            SELECT COUNT(DISTINCT p.id)
            FROM Project p
            WHERE 1=1
        `;

        if (stackNames) {
            countQuery += `
                AND EXISTS (
                    SELECT 1
                    FROM DevelopmentStack ds
                    WHERE ds.projectId = p.id
                    AND ds.stackName = ANY($1::text[])
                )
            `;
        }

        if (title) {
            const paramPosition = stackNames ? 2 : 1;
            countQuery += `
                AND p.title ILIKE $${paramPosition}
            `;
        }

        const totalProjectsResult = await pool.query(countQuery, countQueryParams);
        const totalProjects = parseInt(totalProjectsResult.rows[0].count, 10);

        res.status(200).json({
            projects: keysToCamelCase(result.rows),
            totalProjects,
            currentPage: parsedPage,
            totalPages: Math.ceil(totalProjects / parsedLimit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
    const { title, description, coverPhotoUrl, coverPhotoPublicId, technicalDetailsVideoUrl, technicalDetailsVideoPublicId, projectFeatures, improvementAreas, developmentStack, linkedDocs } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Fetch the current project data
        const currentProjectResult = await client.query('SELECT * FROM Project WHERE id = $1', [id]);
        if (currentProjectResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Project not found' });
        }
        const currentProject = currentProjectResult.rows[0];

        // Delete old cover photo if a new one is provided
        if (coverPhotoUrl && currentProject.coverPhotoPublicId) {
            await cloudinary.uploader.destroy(currentProject.coverPhotoPublicId);
        }

        // Delete old technical details video if a new one is provided
        if (technicalDetailsVideoUrl && currentProject.technicalDetailsVideoPublicId) {
            await cloudinary.uploader.destroy(currentProject.technicalDetailsVideoPublicId, { resource_type: 'video' });
        }

        // Build the update query dynamically
        const fields = [];
        const values = [];
        let query = 'UPDATE Project SET ';

        if (title) {
            fields.push('title');
            values.push(title);
        }
        if (description) {
            fields.push('description');
            values.push(description);
        }
        if (coverPhotoUrl) {
            fields.push('coverPhotoUrl');
            values.push(coverPhotoUrl);
        }
        if (coverPhotoPublicId) {
            fields.push('coverPhotoPublicId');
            values.push(coverPhotoPublicId);
        }
        if (technicalDetailsVideoUrl) {
            fields.push('technicalDetailsVideo');
            values.push(technicalDetailsVideoUrl);
        }
        if (technicalDetailsVideoPublicId) {
            fields.push('technicalDetailsVideoPublicId');
            values.push(technicalDetailsVideoPublicId);
        }
        if (linkedDocs) {
            fields.push('linkedDocs');
            values.push(linkedDocs);
        }

        if (fields.length > 0) {
            query += fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
            query += ', updatedAt = CURRENT_TIMESTAMP WHERE id = $' + (fields.length + 1) + ' RETURNING *';
            values.push(id);

            const projectResult = await client.query(query, values);

            // Update project features
            const parsedProjectFeatures = projectFeatures ? JSON.parse(projectFeatures) : [];
            if (parsedProjectFeatures) {
                await client.query('DELETE FROM ProjectFeature WHERE projectId = $1', [id]);
                for (const feature of parsedProjectFeatures) {
                    await client.query(
                        'INSERT INTO ProjectFeature (projectId, featureName) VALUES ($1, $2)',
                        [id, feature.featureName]
                    );
                }
            }

            // Update improvement areas
            const parsedImprovementAreas = improvementAreas ? JSON.parse(improvementAreas) : [];
            if (parsedImprovementAreas) {
                await client.query('DELETE FROM ImprovementArea WHERE projectId = $1', [id]);
                for (const area of parsedImprovementAreas) {
                    await client.query(
                        'INSERT INTO ImprovementArea (projectId, areaName) VALUES ($1, $2)',
                        [id, area.areaName]
                    );
                }
            }

            // Update development stack
            const parsedDevelopmentStack = developmentStack ? JSON.parse(developmentStack) : [];
            if (parsedDevelopmentStack) {
                await client.query('DELETE FROM DevelopmentStack WHERE projectId = $1', [id]);
                for (const stack of parsedDevelopmentStack) {
                    await client.query(
                        'INSERT INTO DevelopmentStack (projectId, stackName) VALUES ($1, $2)',
                        [id, stack.stackName]
                    );
                }
            }

            await client.query('COMMIT');
            res.status(200).json({ project: projectResult.rows[0] });
        } else {
            await client.query('ROLLBACK');
            res.status(400).json({ error: 'No fields to update' });
        }
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

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
        const checkUser = await pool.query(
            'SELECT * FROM DemoRequest WHERE emailAddress = $1 AND projectId = $2 AND status != $3', 
            [emailAddress, projectId, 'denied']
        );
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ error: 'You already have an active demo request for this project' });
        }
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
    const { page = 1, limit = 9 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await pool.query(
            `SELECT dr.*, p.title AS projectName
             FROM DemoRequest dr
             LEFT JOIN Project p ON dr.projectId = p.id
             ORDER BY dr.createdAt DESC
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        const totalResult = await pool.query('SELECT COUNT(*) FROM DemoRequest');
        const totalDemoRequests = parseInt(totalResult.rows[0].count, 10);

        res.status(200).json({
            demoRequests: result.rows,
            totalDemoRequests,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(totalDemoRequests / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the status of a demo request by ID
const updateDemoRequestStatus = async (req, res) => {
    const { id } = req.params;
    let { status } = req.body;
    status = status.toLowerCase();

    try {
        const result = await pool.query(
            'UPDATE DemoRequest SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Demo request not found' });
        }

        const demoRequest = result.rows[0];
        const { fullname, emailaddress, requestdate, requesttime } = demoRequest;

        

        let emailTemplatePath;
        let emailSubject;
        let emailHtml;

        if (status === 'approved') {
            emailTemplatePath = path.join(__dirname, '../templates/Emails/ApprovedDemo.html');
            emailSubject = 'Your Demo Request has been Approved';
        } else if (status === 'denied') {
            emailTemplatePath = path.join(__dirname, '../templates/Emails/DeniedDemo.html');
            emailSubject = 'Your Demo Request has been Denied';
        }

        if (emailTemplatePath) {
            emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
            emailHtml = emailHtml.replace('[User Name]', fullname)
                                 .replace('[Insert Demo Date]', requestdate)
                                 .replace('[Insert Demo Time]', requesttime)
                                 .replace('[Link here]', 'https://meet.google.com/nrw-aqmy-ngk');

            await sendEmail(emailaddress, emailSubject, emailHtml);
        }

        res.status(200).json({ demoRequest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get the number of active demo requests
const getActiveDemoRequestsCount = async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM DemoRequest WHERE LOWER(status) = $1', ['active']);
        const activeDemoRequestsCount = parseInt(result.rows[0].count, 10);
        res.status(200).json({ activeDemoRequestsCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    createDemoRequest,
    getDemoRequests,
    updateDemoRequestStatus,
    filterProjects,
    getActiveDemoRequestsCount // Export the new function
};