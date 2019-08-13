const start = require("./args/start");
const end = require("./args/end");
const help = require("./args/help");

module.exports = (client, msg) => {
  // init variables
  const server = msg.guild;
  const generalChannel = server.channels.find(val => val.name === "general");
  const args = msg.content.split(" ");
  const keyword = args[1];

  switch (keyword) {
    case "end":
      end(server, generalChannel);
      break;
    case "start":
      start(client, msg, server, generalChannel, args);
      break;
    case "help":
      help(client, msg);
      break;
    default:
      msg.reply(`Sorry, your argument(s) for this command are/were invalid.`);
      break;
  }
};
