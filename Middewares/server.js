const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dfporfl8y',
    api_key: '244749221557343',
    api_secret: 'jDkVlzvkhHjb81EvaLjYgtNtKsY',
});

// Set up multer to handle file uploads with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify the folder in Cloudinary where the files will be stored
        allowed_formats: ['jpg', 'jpeg', 'png'], // Optional: limit the allowed file formats
        use_filename: true,
    },
});

const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/', upload.fields([
    { name: 'avatar', maxCount: 1 }, // 'avatar' is the field name, and only one file is allowed
    { name: 'gallery', maxCount: 5 } // 'gallery' is the field name, and up to five files are allowed
]), (req, res) => {
    // Access Cloudinary URLs through req.files
    console.log(req.files);

    // Handle the rest of your logic here

    res.send('Files uploaded to Cloudinary successfully!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
