const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mangaSchema = new Schema({
  title: {type: String, required: true, trim: true},
  nickname: {type: String, trim: true},

  mangadex_id: {type: Number},
  poketo_id: {type: String, required: true},

  link: {type: String, required: true, trim: true},
  description: {type: String, required: true},
  author: {type: String},
  artist: {type: String},
  genres: [{type: String}],

  currentChapter: {type: Number},
  followers: [{type: String}]
});
module.exports = mongoose.model('manga', mangaSchema);
