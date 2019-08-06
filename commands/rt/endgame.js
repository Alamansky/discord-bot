const pAlphabet = require("../../data/phoenetic-alphabet");

module.exports = (server, generalChannel) => {
  server.channels.some(channel => {
    if (pAlphabet.some(x => x == channel.name)) {
      channel.delete("Random team channel deleted because game is over.");
    }
  });
  return generalChannel.send("Game Over!");
};
