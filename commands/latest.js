const mangadex = require('mangadex-api');
const poketo = require('poketo');
const Manga = require('../storage/mangas.js');

module.exports = {
  name: 'latest',
  description: 'Grabs the latest chapter and links it',
  execute(message, args){
      Mangas.find({title: args[0]}, function(err, manga){
        if(err)
          message.channel.send("Manga not found");
        else
          message.channel.send("Latest chapter is: " +manga.link);
      })
  }
};
