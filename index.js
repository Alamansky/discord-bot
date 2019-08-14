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

// Dummy server so that Heroku doesn't crash while running the bot
const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>A Discord Bot Lives Here</h1>");
});

// timeout will ping bot every 20 mins to keep the heroku dyno awake
setInterval(function() {
  http.get("https://discord-botticelli.herokuapp.com/");
}, 1200000);

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
