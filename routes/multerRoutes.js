import { Router } from 'express';
import multerMiddleware from '../middleware/multerMiddleware.js';
import { imageUploadPage, uploadImages_, deleteImage_ } from '../controllers/multerController.js';

const router = Router();
router.get('/', imageUploadPage);
router.post('/upload/images', multerMiddleware, uploadImages_);
// router.delete('/delete/images/:id', deleteImage_);
router.delete('/delete/images/:public_id', deleteImage_);

export default router;
