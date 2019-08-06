const fs = require("fs");

module.exports = (client, ...args) => {
  const [message] = args;
  const commandCurrent = message.content.split(" ")[0];
  const prefix = commandCurrent.substring(0, 1);
  const commandWord = commandCurrent.substring(1);

  if (prefix == "!") {
    try {
      let commandFunc = require(`../commands/${commandWord}/${commandWord}.js`);
      commandFunc(client, message, ...args);
    } catch (error) {
      message.reply(`Sorry, that is not a recognized command.`);
      console.log(`Error from message.js catch block: ${error}`);
    }
  }
};
