instructions = `
**Permissions:**

User must have role of \`randomizer\` to use this feature.

**Commands:**

\`start\`

- Takes one integer argument, which is the number of players per team.
- This number must be greter than zero and less than, or equal to, half the total number of players (this ensures the randomizer creates at least two teams).
- If these conditions for the single argument are met, a new voice channel for each team is created.
- Players in the "Lobby" voice channel will be evenly distributed to these teams at random.
- If a "Lobby" channel does not exist, you will need to create one.

\`endgame\`

- Deletes all team channels created by the \`randomize\` command.

\`instructions\`

- Displays instructions for bot feature.

`;

module.exports = (client, messsage, ...args) => messsage.reply(instructions);
