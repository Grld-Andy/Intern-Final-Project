import { Router } from "express";
import projectController from '../controllers/projectController.js';
import { upload, uploadToCloudinary } from '../middleware/cloudinaryUploadMiddleware.js';

const router = Router();

router.post('/projects', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.createProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProject);
router.patch('/projects/:id', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), uploadToCloudinary, projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

router.post('/demo-requests', projectController.createDemoRequest);
router.get('/demo-requests', projectController.getDemoRequests);
router.patch('/demo-requests/:id/status', projectController.updateDemoRequestStatus);

export default router;