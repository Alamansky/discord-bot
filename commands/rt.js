const Discord = require("discord.js");
const pAlphabet = require("../util/data/phoenetic-alphabet");
const r = require("../util/data/rt-error-responses");
const validate = require("../util/validate");
const shuffle = require("../util/shuffle");

module.exports = (client, msg) => {
  // check permissions of command author
  if (
    !validate(
      !msg.member.roles.some(role => role.name === "randomizer"),
      r.notAdmin,
      msg
    )
  )
    return;

  // init variables
  var server = msg.guild;
  let generalChannel = server.channels.find(val => val.name === "general");
  let args = msg.content.split(" ");

  // check for endgame command
  if (args[1] == "endgame") {
    server.channels.some(channel => {
      if (pAlphabet.some(x => x == channel.name)) {
        channel.delete("Random team channel deleted because game is over.");
      }
    });
    return generalChannel.send("Game Over!");
  }

  // get players per team (command arg 1)
  let playersPerTeam = Number(args[1]);

  // check if arg is integer
  if (!validate(isNaN(playersPerTeam), r.nan, msg)) return;

  // init more variables
  let lobbyMembers = server.channels.find(val => val.name === "lobby").members;
  let numOfPlayers = lobbyMembers.array().length;

  // basic error checking
  if (!validate(numOfPlayers == 0, r.noPlayers, msg)) return;
  if (!validate(playersPerTeam > numOfPlayers, r.tooFewPlayers, msg)) return;
  if (!validate(playersPerTeam > 4, r.teamTooBig, msg)) return;

  // calculate number and size of teams
  let numOfTeams = Math.floor(numOfPlayers / playersPerTeam);
  let overflowPlayers = Math.floor(numOfPlayers % playersPerTeam);
  let teamSizes = Array(numOfTeams).fill(playersPerTeam);

  // adjust size of teams for "overflow players"
  for (i = 0; i < overflowPlayers; ++i) {
    teamSizes[i] = teamSizes[i] + 1;
  }

  // create voice channels
  (async function makeChannels() {
    let teamChannels = [];

    //fill teamChannels arr with one voice channel per team
    for (i = 0; i < numOfTeams; ++i) {
      teamChannels[i] = await server.createChannel(
        `${pAlphabet[i] || i}`,
        "voice"
      );
    }

    //randomize the order of players in lobby
    // TODO: implement Fisher-Yates algo
    let lobbyMembersShuffled = shuffle(lobbyMembers.array());

    //for each team, select requried number of randomly sorted players from lobby
    teamSizes.forEach((team, index) => {
      let message = [];
      lobbyMembersShuffled.splice(0, team).forEach(player => {
        player.setVoiceChannel(teamChannels[index]);
        message.push(`${player} joined ${pAlphabet[index]} team\n`);
        generalChannel.send(`${message}`);
      });
    });
  })();

  // return message with number of channels created
  return generalChannel.send(`${numOfTeams} voice channels created`);
};
