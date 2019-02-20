const mangadex = require('mangadex-api');
const poketo = require('poketo');

module.exports = {
  name: 'search',
  description: 'Searches mangadex for a manga',
  execute(message, args){
    mangadex.search(args[0]).then(response =>{
      console.log('Found ' + response.titles.length + ' mangas')
      if(response.titles.length <= 5){
        for(result of response.titles){
          message.channel.send('https://mangadex.org/title/'+result.id);
        }
      }
    });
  }
};
