import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10485760 } // 10 MB file size limit
});

const uploadToCloudinary = (req, res, next) => {
    const uploadPromises = [];

    if (req.files && req.files.coverPhoto) {
        const coverPhoto = req.files.coverPhoto[0];
        const coverPhotoPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'projects/cover_photos' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    req.body.coverPhotoUrl = result.secure_url;
                    req.body.coverPhotoPublicId = result.public_id;
                    resolve();
                }
            });
            uploadStream.end(coverPhoto.buffer);
        });
        uploadPromises.push(coverPhotoPromise);
    }

    if (req.files && req.files.technicalDetailsVideo) {
        const technicalDetailsVideo = req.files.technicalDetailsVideo[0];
        const technicalDetailsVideoPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'video', folder: 'projects/technical_videos' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    req.body.technicalDetailsVideoUrl = result.secure_url;
                    req.body.technicalDetailsVideoPublicId = result.public_id;
                    resolve();
                }
            });
            uploadStream.end(technicalDetailsVideo.buffer);
        });
        uploadPromises.push(technicalDetailsVideoPromise);
    }

    Promise.all(uploadPromises)
        .then(() => next())
        .catch(error => res.status(500).json({ error: error.message }));
};

export { upload, uploadToCloudinary };