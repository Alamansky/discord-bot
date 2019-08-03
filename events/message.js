const fs = require("fs");

let commandObj = {};
fs.readdir("./commands", (err, files) => {
  files.forEach(file => {
    let commandFunc = require(`../commands/${file}`);
    let commandName = file.split(".")[0];

    commandObj[commandName] = commandFunc;
  });
});

module.exports = (client, ...args) => {
  let [Message] = args;

  let commandCurrent = Message.content.split(" ")[0];

  if (commandCurrent.substring(0, 1) == "!") {
    try {
      commandObj[commandCurrent.substring(1)](client, Message, ...args);
    } catch (error) {
      console.log(`Error from message.js catch block: ${error}`);
    }
  }
};
