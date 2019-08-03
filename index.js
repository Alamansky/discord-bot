const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    let eventHandler = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

client.login(process.env.BOT_TOKEN);
