const discord = require('discord.js');
const bot = new discord.Client();
const token = 'put token here';

const keywords = ['getpacket'];
//const commands = ['unban'];
var server;
var nameGuard = false;
var userName = 'Saltbot';
var pcap = require('pcap'),
    pcap_session = pcap.createSession("", "ip");

bot.on('ready', () => {
  server = bot.guilds.first();//cache server object
  console.log("Ready!");
});

//update the server object if it changes (this may or may not be bad)
bot.on('guildUpdate', function(oldServer, newServer) {
  server = newServer;
  console.log("Server cache updated");
});

// create an event listener for messages
bot.on('message', function(message) {
  GetPacket(message);
});



function GetPacket(message) {
  let str = message.content.toLowerCase();
  for(let word of keywords) {
    if(str.includes(word)){
      message.channel.sendMessage('command recieved');
    }
  }
}

bot.on('guildMemberUpdate', function(oldUser, newUser) {

  //changing the name triggers another guildMemberUpdate, so ignore the very next event
  if(nameGuard) {
    nameGuard = false;
    return;
  }
  nameGuard = true;

  if(newUser.user.username == 'saltmaster') {
    server.member(newUser.user).setNickname(userName);
    console.log("Username reset to %s", userName);
  }

});

// log our bot in
bot.login(token);
