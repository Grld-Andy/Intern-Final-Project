import express from 'express';
import projectController from '../controllers/projectController.js';
import { upload, uploadToCloudinary } from '../middleware/cloudinaryUploadMiddleware.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

const router = express.Router();

router.post('/projects', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.createProject);
router.patch('/projects/:id', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);
router.patch('/demo-requests/:id/status', projectController.updateDemoRequestStatus);

router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProject);
router.post('/demo-requests', projectController.createDemoRequest);
router.get('/demo-requests', projectController.getDemoRequests);
router.get('/auth/user', projectController.getCurrentUser);

export default router;