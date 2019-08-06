const pAlphabet = require("../data/phoenetic-alphabet");

module.exports = async function(server, numOfChannels, channelType) {
  let teamChannels = [];
  for (i = 0; i < numOfChannels; ++i) {
    teamChannels[i] = await server.createChannel(
      `${pAlphabet[i] || i}`,
      channelType
    );
  }
  return teamChannels;
};
