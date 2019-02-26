const discord = require('discord.js');
const fs = require('fs');
const mangadex = require('mangadex-api');
const poketo = require('poketo');
const mongoose = require('mongoose');

//pull config
const {prefix,token,dbuser,dbpass} = require('./config/config.json');

//connect to mongo
mongoose.connect('mongodb://'+dbuser+':'+dbpass+'@ds225375.mlab.com:25375/saltbot',
  {useNewUrlParser: true})
  .then(() => {
    console.log('connected to mongodb');
});

//create bot
const bot = new discord.Client();

//command setup
bot.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

//other variables
var server;
var nameGuard = false;
var userName = 'Saltbot';

//bot started, starts interval manga check
bot.on('ready', () => {
  server = bot.guilds.first();//cache server object
  console.log("Ready!");
  //var interval = setInterval(function(){checkStatus();}, 300000);//5 mins
});

//check messages for a command, etc.
bot.on('message', message=> {
  if(!message.content.startsWith(prefix) || message.author.bot)
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('That command is borked :PepeHands:');
	}
});

//update the server object if it changes (this may or may not be bad)
bot.on('guildUpdate', function(oldServer, newServer) {
  server = newServer;
  console.log("Server cache updated");
});


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
