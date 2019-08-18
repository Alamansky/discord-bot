const createLobby = require("./args/createLobby");
const removeLobby = require("./args/removeLobby");
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
    case "create-lobby":
      createLobby(server, generalChannel);
      break;
    case "remove-lobby":
      removeLobby(server, generalChannel);
      break;
    case "end-game":
      end(server, generalChannel);
      break;
    case "start-game":
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
