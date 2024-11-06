/**
 * @swagger
 *
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *               coverPhotoUrl:
 *                 type: string
 *                 description: The URL of the cover photo
 *               coverPhotoPublicId:
 *                 type: string
 *                 description: The public ID of the cover photo
 *               technicalDetailsVideoUrl:
 *                 type: string
 *                 description: The URL of the technical details video
 *               technicalDetailsVideoPublicId:
 *                 type: string
 *                 description: The public ID of the technical details video
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all projects with pagination
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 6)
 *         example: 6
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       title:
 *                         type: string
 *                         example: "Project Title"
 *                       description:
 *                         type: string
 *                         example: "Project Description"
 *                       coverPhotoUrl:
 *                         type: string
 *                         example: "http://example.com/photo.jpg"
 *                       technicalDetailsVideo:
 *                         type: string
 *                         example: "http://example.com/video.mp4"
 *                       linkedDocs:
 *                         type: string
 *                         example: "http://example.com/docs"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       projectFeatures:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             featureName:
 *                               type: string
 *                               example: "Feature 1"
 *                       improvementAreas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             areaName:
 *                               type: string
 *                               example: "Area 1"
 *                       developmentStack:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             stackName:
 *                               type: string
 *                               example: "React"
 *                 totalProjects:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 17
 *       500:
 *         description: Internal server error
 *
 * /api/v1/projects/filter:
 *   get:
 *     summary: Filter and search projects with pagination
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: stackNames
 *         schema:
 *           type: string
 *         description: Comma-separated list of stack names to filter by
 *         example: "React,Node.js"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 6)
 *         example: 6
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order (mostRecent or oldestFirst)
 *         example: "mostRecent"
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Project title to search for
 *         example: "Project H"
 *     responses:
 *       200:
 *         description: A list of filtered projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       title:
 *                         type: string
 *                         example: "Project H"
 *                       description:
 *                         type: string
 *                         example: "Description of Project H"
 *                       coverPhotoUrl:
 *                         type: string
 *                         example: "http://example.com/photo.jpg"
 *                       technicalDetailsVideo:
 *                         type: string
 *                         example: "http://example.com/video.mp4"
 *                       linkedDocs:
 *                         type: string
 *                         example: "http://example.com/docs"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       projectFeatures:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             featureName:
 *                               type: string
 *                               example: "Feature 1"
 *                       improvementAreas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             areaName:
 *                               type: string
 *                               example: "Area 1"
 *                       developmentStack:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             stackName:
 *                               type: string
 *                               example: "React"
 *                 totalProjects:
 *                   type: integer
 *                   example: 9
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 2
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     title:
 *                       type: string
 *                       example: "Project Title"
 *                     description:
 *                       type: string
 *                       example: "Project Description"
 *                     coverPhotoUrl:
 *                       type: string
 *                       example: "http://example.com/photo.jpg"
 *                     technicalDetailsVideo:
 *                       type: string
 *                       example: "http://example.com/video.mp4"
 *                     linkedDocs:
 *                       type: string
 *                       example: "http://example.com/docs"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00Z"
 *                     projectFeatures:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           featureName:
 *                             type: string
 *                             example: "Feature 1"
 *                     improvementAreas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           areaName:
 *                             type: string
 *                             example: "Area 1"
 *                     developmentStack:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           stackName:
 *                             type: string
 *                             example: "React"
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
 *         application/json:
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
 *               coverPhotoUrl:
 *                 type: string
 *                 description: The URL of the cover photo
 *               coverPhotoPublicId:
 *                 type: string
 *                 description: The public ID of the cover photo
 *               technicalDetailsVideoUrl:
 *                 type: string
 *                 description: The URL of the technical details video
 *               technicalDetailsVideoPublicId:
 *                 type: string
 *                 description: The public ID of the technical details video
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
 *                 description: The ID of the project
 *               fullName:
 *                 type: string
 *                 description: The full name of the requester
 *               emailAddress:
 *                 type: string
 *                 description: The email address of the requester
 *               requestDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the demo request
 *               requestTime:
 *                 type: string
 *                 format: time
 *                 description: The time of the demo request
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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 9)
 *         example: 9
 *     responses:
 *       200:
 *         description: A list of demo requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 demoRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       projectId:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       emailAddress:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       requestDate:
 *                         type: string
 *                         format: date
 *                         example: "2023-01-01"
 *                       requestTime:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       comments:
 *                         type: string
 *                         example: "Looking forward to the demo"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                 totalDemoRequests:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 12
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
 *                 type: string
 *                 description: The new status of the demo request
 *     responses:
 *       200:
 *         description: Demo request status updated successfully
 *       404:
 *         description: Demo request not found
 *       500:
 *         description: Internal server error
 * /api/v1/demo-requests/active/count:
 *   get:
 *     summary: Get the number of active demo requests
 *     tags: [Demo Requests]
 *     responses:
 *       200:
 *         description: Number of active demo requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeDemoRequestsCount:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Internal server error
 */