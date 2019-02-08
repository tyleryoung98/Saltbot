const mangadex = require('mangadex-api');
const poketo = require('poketo').default;
const Manga = require('../storage/mangas.js');

module.exports = {
  name: 'getManga',
  description: 'grabs a manga from the db and returns in chat',
  execute(message, args){
      var mangaptr;
      Mangas.find({title: args[0]}, function(err, manga){
        if(err){
          console.log("Manga not found by title!");
        }
        else{
          message.channel.send(manga.link);
          return;
        }
      });

      Mangas.find({nickname: args[0]}, function(err, manga){
        if(err){
          console.log("Manga not found by nickname!");
        }
        else{
          message.channel.send(manga.link);
          return;
        }
      });

      Mangas.find({title: args[0]}, function(err, manga){
        if(err){
          message.channel.send("Manga not found by slug!");
        }
        else{
          message.channel.send(manga.link);
          return;
        }
      });
      message.channel.send("Manga not found in bot DB. Try a different wording or the exact title.");
  }
};
