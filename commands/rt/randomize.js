const pAlphabet = require("../../data/phoenetic-alphabet");
const shuffle = require("../../util/shuffle");
const maketChannels = require("../../util/makeChannels");
const userError = require("./userError");

module.exports = async (client, msg, server, generalChannel, args) => {
  // init variables
  const lobbyMembers = server.channels.find(
    val => val.name === "lobby" || val.name === "Lobby"
  ).members;
  const playersArray = shuffle(lobbyMembers.array());
  const playersPerTeam = Number(args[2]);
  const numOfPlayers = lobbyMembers.array().length;
  let teamChannels = [];
  let teams = [];

  let conditions = [
    msg.member.roles.some(role => role.name === "randomizer"),
    typeof playersPerTeam == "number",
    numOfPlayers > 0 && playersPerTeam <= numOfPlayers / 2
  ];

  if (!conditions.every(condition => condition)) {
    msg.reply(userError);
    return null;
  } else {
    while (playersArray.length >= playersPerTeam) {
      teams.push(playersArray.splice(0, playersPerTeam));
    }

    while (playersArray.length > 0) {
      teams.push(playersArray.splice(0, 1));
    }

    teamChannels = await maketChannels(server, teams.length, "voice");

    teams.forEach((team, index) =>
      team.forEach(member => {
        member.setVoiceChannel(teamChannels[index]);
        generalChannel.send(`${member} joined team ${pAlphabet[index]}`);
      })
    );
    return generalChannel.send(`${teams.length} voice channels created`);
  }
};
