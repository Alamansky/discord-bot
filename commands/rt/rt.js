const randomize = require("./randomize");
const endgame = require("./endgame");
const instructions = require("./instructions");

module.exports = (client, msg) => {
  // init variables
  const server = msg.guild;
  const generalChannel = server.channels.find(val => val.name === "general");
  const args = msg.content.split(" ");
  const keyword = args[1];

  switch (keyword) {
    case "endgame":
      endgame(server, generalChannel);
      break;
    case "randomize":
      randomize(client, msg, server, generalChannel, args);
      break;
    case "instructions":
      instructions(client, msg);
      break;
    default:
      msg.reply(`Sorry, your argument(s) for this command are/were invalid.`);
      break;
  }
};
