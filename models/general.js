const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let generalSchema = new Schema({
  userID: {type: Number, required: true},/*
  username: {type: String, required: true},
  discriminator: {type: String, required: true},*/
  omgCount: {type: Number},
});
module.exports = mongoose.model('general', generalSchema);
