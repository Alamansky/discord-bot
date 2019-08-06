const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();

// callback function for iife below
const assignEventHandlers = (err, files) => {
  try {
    // loop through files in ./events
    files.forEach(file => {
      // put exported function in variable eventHandler
      let eventHandler = require(`./events/${file}`);
      // capture file name without file extension
      let eventName = file.split(".")[0];
      // when the client fies an event, execute callback function from file with matching name
      client.on(eventName, (...args) => eventHandler(client, ...args));
    });
  } catch (err) {
    console.log(err);
  }
};

// read files in ./events and pass them to assignEventHandlers
(function readEventsDirectory() {
  fs.readdir("./events/", assignEventHandlers);
})();

client.login(process.env.BOT_TOKEN);
