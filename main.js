// Required import(s)
const { Client, Intents } = require("discord.js");

// Instantiate variables
const client = new Client({intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]}); // instance of a client
const token = require("./config.json").token;
const guildId = require("./config.json").guild_id;
const members_vc_id = require("./config.json").members_vc_id;

client.on('ready', () => {
    updateMemberCount();
})

/*************************************************************
                MEMBERS COUNT VOICE CHANNEL 
**************************************************************/

function updateMemberCount() {
    let myGuild = client.guilds.cache.get(guildId); // my server (guild)
    let memberCount = myGuild.members.cache.filter(member => !member.user.bot).size;
    let botCount = myGuild.members.cache.filter(member => member.user.bot).size;
    console.log(memberCount);
    console.log(botCount);
    let memberCountChannel = myGuild.channels.cache.get(members_vc_id);
    memberCountChannel.setName('Homies : ' + memberCount.toString())
        .catch(error => console.log(error));
    return memberCountChannel.name;
}

client.on('guildMemberAdd', member => {
    updateMemberCount();
});

client.on('guildMemberRemove', member => {
    // When a guild member leaves, update the channel name
    updateMemberCount();
});

/*************************************************************
                LOG INFORMATION INTO BOT
**************************************************************/

client.login(token); // log into discord bot  