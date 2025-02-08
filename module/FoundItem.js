
const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  founderName:{type:String},
  title: {type:String},
  description:{type:String},
  image: {type:String},
  date:{type:String},
  place:{type:String},
  // OwnerName: {type:String}
});

module.exports = mongoose.model('FoundItem', foundItemSchema);
