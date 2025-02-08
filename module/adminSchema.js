const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    role: {
        type: String,
        enum: ['superadmin', 'busadmin', 'libraryadmin','resourceadmin','lostandfoundadmin','eventadmin'], // Add your roles here
        required: true
    },
    password:{
        type:String,
        require:true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
