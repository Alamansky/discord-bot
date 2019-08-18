module.exports = async (server, generalChannel) => {
  server.createChannel(`Lobby`, "voice");
  return generalChannel.send("The Lobby is now open.");
};
