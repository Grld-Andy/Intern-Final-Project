/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the project
 *               description:
 *                 type: string
 *                 description: A detailed description of the project
 *               projectFeatures:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of project features, e.g.,
 *                   '[{"featureName": "Feature 1"}, {"featureName": "Feature 2"}]'
 *               improvementAreas:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of improvement areas, e.g.,
 *                   '[{"areaName": "Area 1"}, {"areaName": "Area 2"}]'
 *               developmentStack:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of development stack items, e.g.,
 *                   '[{"stackName": "React"}, {"stackName": "Node.js"}]'
 *               linkedDocs:
 *                 type: string
 *                 description: A URL to the linked documentation
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *                 description: The cover photo file for the project
 *               technicalDetailsVideo:
 *                 type: string
 *                 format: binary
 *                 description: The technical details video file for the project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Missing required files
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: stackNames
 *         schema:
 *           type: string
 *         description: Comma-separated list of stack names to filter by
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order (mostRecent or oldestFirst)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Project title to search for
 *     responses:
 *       200:
 *         description: A list of projects
 *       500:
 *         description: Internal server error
 *
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project details
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the project
 *               description:
 *                 type: string
 *                 description: A detailed description of the project
 *               projectFeatures:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of project features, e.g.,
 *                   '[{"featureName": "Feature 1"}, {"featureName": "Feature 2"}]'
 *               improvementAreas:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of improvement areas, e.g.,
 *                   '[{"areaName": "Area 1"}, {"areaName": "Area 2"}]'
 *               developmentStack:
 *                 type: string
 *                 description: >
 *                   A JSON string representing an array of development stack items, e.g.,
 *                   '[{"stackName": "React"}, {"stackName": "Node.js"}]'
 *               linkedDocs:
 *                 type: string
 *                 description: A URL to the linked documentation
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *                 description: The cover photo file for the project
 *               technicalDetailsVideo:
 *                 type: string
 *                 format: binary
 *                 description: The technical details video file for the project
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 * /api/v1/demo-requests:
 *   post:
 *     summary: Create a new demo request
 *     tags: [Demo Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The ID of the project for which the demo is requested
 *               fullName:
 *                 type: string
 *                 description: Full name of the person requesting the demo
 *               emailAddress:
 *                 type: string
 *                 description: Email address of the person requesting the demo
 *               requestDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the demo request
 *               requestTime:
 *                 type: string
 *                 format: time
 *                 description: Time of the demo request
 *               comments:
 *                 type: string
 *                 description: Additional comments for the demo request
 *     responses:
 *       201:
 *         description: Demo request created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all demo requests
 *     tags: [Demo Requests]
 *     responses:
 *       200:
 *         description: A list of demo requests
 *       500:
 *         description: Internal server error
 *
 * /api/v1/demo-requests/{id}/status:
 *   patch:
 *     summary: Update the status of a demo request by ID
 *     tags: [Demo Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The demo request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: The new status of the demo request
 *     responses:
 *       200:
 *         description: Demo request status updated successfully
 *       404:
 *         description: Demo request not found
 *       500:
 *         description: Internal server error
 */