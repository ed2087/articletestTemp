import { mongoose, Image} from '../models/index.js';
import { v2 as cloudinary } from 'cloudinary';



// image upload page
export const imageUploadPage = (req, res) => {
  console.log('imageUploadPage');
    res.render('new-article',{
      title: 'Upload Image',
      metaDescription: 'Upload Image',    
    });
};

export const uploadImages_ = async (req, res) => {
  try {
    const files = req.files;      

    if (!files) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const images = req.uploadedImages.map((image, i) => {
      const publicIdSegments = image.public_id.split('/');
      const cleanedPublicId = publicIdSegments[publicIdSegments.length - 1];

      return {
        filename: files[i].filename,
        path: files[i].path,
        originalname: files[i].originalname,
        mimetype: files[i].mimetype,
        size: files[i].size,
        asset_id: image.asset_id,
        public_id: cleanedPublicId,
        width: image.width,
        height: image.height,
        format: image.format,
        url: image.url,
        secureUrl: image.secure_url
      };
    });

    console.log(images, "47 - images");

    const savedImages = await Image.insertMany(images);
    res.status(200).json({ message: 'Images uploaded successfully', images: savedImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// export const deleteImage_ = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const image = await Image.findById(id);
//     if (!image) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     // Delete image from Cloudinary
//     const destroyCloudaniryIMG = await cloudinary.uploader.destroy(`${image.public_id}`);
   
//     // Delete image record from database
//     const dbIMGdestroy = await Image.findByIdAndDelete(id);

//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

export const deleteImage_ = async (req, res) => {
  try {
    const { public_id } = req.body;
    const image = await Image.findOne({ public_id });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete image from Cloudinary we will change demo name if in different file
    await cloudinary.uploader.destroy(`demo/${public_id}`);
   
    // Delete image record from database
    await Image.findOneAndDelete({ public_id });

    console.log("Image deleted successfully");

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
