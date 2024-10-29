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
 *               description:
 *                 type: string
 *               projectFeatures:
 *                 type: string
 *               improvementAreas:
 *                 type: string
 *               developmentStack:
 *                 type: string
 *               linkedDocs:
 *                 type: string
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *               technicalDetailsVideo:
 *                 type: string
 *                 format: binary
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
 *   put:
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               coverPhotoUrl:
 *                 type: string
 *               technicalDetailsVideo:
 *                 type: string
 *               projectFeatures:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     featureName:
 *                       type: string
 *               improvementAreas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     areaName:
 *                       type: string
 *               developmentStack:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stackName:
 *                       type: string
 *               linkedDocs:
 *                 type: string
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
 *               fullName:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *               requestDate:
 *                 type: string
 *                 format: date
 *               requestTime:
 *                 type: string
 *                 format: time
 *               comments:
 *                 type: string
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
 *     responses:
 *       200:
 *         description: Demo request status updated successfully
 *       404:
 *         description: Demo request not found
 *       500:
 *         description: Internal server error
 */