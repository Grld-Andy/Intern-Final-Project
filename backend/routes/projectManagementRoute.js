import { Router } from "express";
import projectController from '../controllers/projectController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image and video files
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid image file'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 } // Limit file size to 10MB
});

router.post('/projects', upload.fields([{ name: 'coverPhoto' }, { name: 'technicalDetailsVideo' }]), projectController.createProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

router.post('/demo-requests', projectController.createDemoRequest);
router.get('/demo-requests', projectController.getDemoRequests);
router.patch('/demo-requests/:id/status', projectController.updateDemoRequestStatus);

export default router;