const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mangaSchema = new Schema({
  title: {type: String, required: true, trim: true},
  nickname: {type: String, trim: true},
  slug: {type: String},
  link: {type: String, required: true, trim: true},
  description: {type: String, required: true}
})
module.exports = mongoose.model('manga', mangaSchema);
