module.exports = async (client, msg, server, generalChannel, args) => {
  server.createChannel(`Lobby`, "voice");
};
