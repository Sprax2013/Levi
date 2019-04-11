const Discord = require('discord.js');

const client = new Discord.Client();

module.exports = {
    init: function (obj) {
        client.leviGuilds = new dc.Collection();

        // client.cmds.set(prop.cmd.name.toLowerCase(), prop);

        client.on('message', (msg) => {
            msg.reply('IM ALIVE \\o/');
        });

        client.login(require('./files').cfg['BotToken']);
    },
    getLeviGuild: function (guildID) {
        if (client.leviGuilds) {
            return client.leviGuilds.get(guildID);
        }

        return null;
    }
};