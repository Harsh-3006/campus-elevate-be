const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/'; // Default directory
        console.log("base URL",req.originalUrl)
        if (req.originalUrl.includes('resources')) {
            uploadPath += 'resources/';
        } else if (req.originalUrl.includes('lostandfound')) {
            if(req.path.includes('lost')){
                uploadPath += 'lostandfound/lost/';
            }else if(req.path.includes('found')){
                uploadPath += 'lostandfound/found/'
            }
        }
        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter (only allow images)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error("Only images (jpeg, jpg, png) are allowed"));
    }
};

// Multer instance
const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

module.exports = upload;
