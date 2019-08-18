module.exports = (server, generalChannel) => {
  server.channels.some(channel => {
    if (channel.name == "Lobby" || channel.name == "lobby") {
      channel.delete("Lobby deleted because remove-lobby command was used.");
    }
  });
  return generalChannel.send("The Lobby is now closed.");
};
