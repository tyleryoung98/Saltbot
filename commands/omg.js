const db = require('../models/general.js');

module.exports = {
  name: 'omg',
  description: 'Counts the amount of omgs owed to [user]',
  execute(message, args){
    db.findOne({userID: args[0].id}, function(err, user){
      if(err){//if the person isnt found, add them to the db
        db.create({args[0].id, args[0].username, args[0].discriminator, 0}).then(()=>
          console.log('db created for ' + args[0].id);
        );
      }

      user.omgCount++;
      console.log('Current omg count for ' + args[0].username + ': ' + user.omgCount);
    });
  }
};
