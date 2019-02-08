const mangadex = require('mangadex-api');
const poketo = require('poketo');
const Manga = require('../storage/mangas.js');

module.exports = {
  name: 'getManga',
  description: 'grabs a manga from the db and returns in chat',
  execute(message, args){
      Mangas.find({title: args[0]}, function(err, manga){
        if(err)
          message.channel.send("Manga not found");
        else
          message.channel.send(manga.link);
      })
  }
};
