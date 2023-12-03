require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
const port = 3001;
const allowedOrigins = ['http://18.189.26.14:3000', 'http://localhost:3000']; // Replace with your EC2 instance URL

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
// Enable CORS
app.use(cors());

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Configure Multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Handle file upload and upload to S3
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Your S3 Bucket name
        Key: `block-music-albums/${req.file.originalname}`, // File name you want to save as in S3
        Body: req.file.buffer, // File buffer
        ContentType: req.file.mimetype // File MIME type
    };

    // Upload to S3
    s3.upload(params, (err, data) => {
        if (err) {
            console.error("Error uploading to S3: ", err);
            return res.status(500).send(err.message);
        }
        res.send({ message: 'File uploaded successfully.', url: data.Location });
    });
});

// Start the server
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

