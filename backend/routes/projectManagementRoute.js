import express from 'express';
import projectController from '../controllers/projectController.js';
import { upload, uploadToCloudinary } from '../middleware/cloudinaryUploadMiddleware.js';

const router = express.Router();

router.post('/projects', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.createProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/filter', projectController.filterProjects);
router.get('/projects/:id', projectController.getProject);
router.patch('/projects/:id', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

router.patch('/demo-requests/:id/status', projectController.updateDemoRequestStatus);
router.post('/demo-requests', projectController.createDemoRequest);
router.get('/demo-requests', projectController.getDemoRequests);
router.get('/demo-requests/active/count', projectController.getActiveDemoRequestsCount);

export default router;