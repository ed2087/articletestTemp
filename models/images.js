import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number,
    asset_id: String,
    public_id: String,
    width: Number,
    height: Number,
    format: String,
    url: String,
    secureUrl: String
});

const Image = mongoose.model('Image', imageSchema);

export default Image;