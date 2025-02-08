const mongoose = require('mongoose');

const lostitemuploadSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

const lostUpload = mongoose.model('File', lostitemuploadSchema);
module.exports = lostUpload;
