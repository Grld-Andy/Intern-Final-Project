import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();
// Test the connection
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});


// Create a new project with all related data
const createProject = async (req, res) => {
    console.log(req.body);
    const { title, description, coverPhotoUrl, technicalDetailsVideo, projectFeatures, improvementAreas, developmentStack, contributors, linkedDocs } = req.body;
    try {
        await db.query('BEGIN');

        const projectResult = await db.query(
            'INSERT INTO Project (title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, coverPhotoUrl, technicalDetailsVideo, linkedDocs]
        );
        const projectId = projectResult.rows[0].id;

        for (const feature of projectFeatures) {
            await db.query(
                'INSERT INTO ProjectFeature (projectId, featureName, description) VALUES ($1, $2, $3)',
                [projectId, feature.featureName, feature.description]
            );
        }

        for (const area of improvementAreas) {
            await db.query(
                'INSERT INTO ImprovementArea (projectId, areaName, description) VALUES ($1, $2, $3)',
                [projectId, area.areaName, area.description]
            );
        }

        for (const stack of developmentStack) {
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

        for (const contributor of contributors) {
            await db.query(
                'INSERT INTO ProjectContributor (projectId, userId, role) VALUES ($1, $2, $3)',
                [projectId, contributor.userId, contributor.role]
            );
        }

        await db.query('COMMIT');
        res.status(201).json(projectResult.rows[0]);
    } catch (err) {
        await db.query('ROLLBACK');
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