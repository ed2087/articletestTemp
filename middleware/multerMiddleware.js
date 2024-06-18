import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'ed2087',
  api_key: '836557382326967',
  api_secret: 'kJaG6CZYMyihHYn3zMGhlWrBsW0'
});

// Function to filter for specific image types
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Configure multer to upload files with specific options
const upload = multer({
  storage: multer.diskStorage({}), // No local storage needed
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: imageFilter // Filter for specific image types
}).array('images', 5); // Allow up to 5 images to be uploaded

// Custom middleware to upload images to Cloudinary
export default (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err });
    } else if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
    console.log('req.files', req.files);
    try {
      // Upload each file to Cloudinary with specified folder
      const promises = req.files.map((file) => {
        const folder = 'demo'; // Specify your folder name here
        return cloudinary.uploader.upload(file.path, { folder });
      });
      const results = await Promise.all(promises);
      req.uploadedImages = results;
      next();
    } catch (error) {
      console.error('Cloudinary upload error', error);
      return res.status(500).json({ message: 'Cloudinary upload error', error });
    }
  });
};
