const db = require('../models/general.js');
const mongoose = require('mongoose');

module.exports = {
  name: 'omg',
  description: 'Counts the amount of omgs owed to [user]',
  execute(message, args){
    let person = args[0];
    console.log(person);
    db.findOne({userID: person.id}, function(err, user){
      if(err){//if the person isnt found, add them to the db
        let count = 0;
        db.create({person, count}).then(()=>
          console.log('db created for this guy')).catch(function(err2){
            console.log('creation error');
          });
      }
      console.log('skipped creation');
      user.omgCount++;
      console.log('Current omg count for ' + user.username + ': ' + user.omgCount);
    });
  }
};
