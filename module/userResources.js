// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const userResources = new mongoose.Schema({
    Resourcename: {
        type: String,
        required: true
    },
    ResourceCategory: {
        type: String,
        required: true,
    },
    resourceDescription:{
        type:String,
    },
    resourceImage:{
        type:String,
    },
    resourceUploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    borrowed:{
        type:Boolean,
        default:false
    }
})

const UserResources = new mongoose.model('UserResources', userResources)

module.exports = UserResources