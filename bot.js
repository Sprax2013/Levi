const Discord = require('discord.js');
const Levi = require('./classes');
const Files = require('./files');

const client = new Discord.Client();

module.exports = {
    init: function () {
        client.on('ready', () => {
            client.leviGuilds = Files.getLeviGuilds(client);

            // let guildCount = 0,
            //     guildsIgnoredCount = 0,
            //     channelCount = 0,
            //     clientCount = 0,
            //     botCount = 0;

            // for (const guild of client.guilds.values()) {
            //     if (handleGuild(guild)) {
            //         guildCount++;
            //         channelCount += guild.channels.size;

            //         for (const member of guild.members.values()) {
            //             if (member.user.bot) {
            //                 if (member.user !== client.user) {
            //                     botCount++;
            //                 }
            //             } else {
            //                 clientCount++;
            //             }
            //         }

            //         if (!module.exports.hasGuildPrefix(guild)) {
            //             sendInitMsgToGuildOwner(guild);
            //         }
            //     } else {
            //         guildsIgnoredCount++;
            //     }
            // }

            // console.log(
            //     localization.getStringForConsole(
            //         'Bot:Console:Status', 'Bot is active on {0} guilds (while ignoring {1} guilds), in {2} channels for {3} clients (+{4} Bots)')
            //         .format(`${guildCount} ${localization.getWordForConsole('Guild', guildCount)}`,
            //             `${guildsIgnoredCount} ${localization.getWordForConsole('Guild', guildsIgnoredCount)}`,
            //             `${channelCount} ${localization.getWordForConsole('Channel', channelCount)}`,
            //             `${clientCount} ${localization.getWordForConsole('Client', clientCount)}`,
            //             `${botCount} ${localization.getWordForConsole('Bot', botCount)}`
            //         )
            // );

            // module.exports.client = client;

            // updateBotActivity();
        });

        client.on('guildCreate', (guild) => {
            if (!client.leviGuilds.has(guild.id)) {
                client.leviGuilds.set(guild.id, new Levi.LeviGuild(guild));
                Files.storeLeviGuilds(client.leviGuilds);
            } else {
                client.leviGuilds.get(guild.id).settings.deletedSince = undefined;
            }
        });

        client.on('guildDelete', (guild) => {
            // if (handleGuild(guild)) {
            //     console.log(localization.getStringForConsole('Bot:Console:LeftGuild', 'I have been removed from \'{0}\' (ID: {1})').format(guild.name, guild.id));
            // }

            // updateBotActivity();

            client.leviGuilds.get(guild.id).settings.deletedSince = Date.now();
            Files.storeLeviGuilds(client.leviGuilds);
        });

        client.on('message', (msg) => {
            if (!client.leviGuilds) return; // Bot not ready
            if (msg.author === client.user) return; // Ignore itself

            if (msg.channel instanceof Discord.DMChannel) {
                console.log(msg.content);
            }


            console.log(msg.channel instanceof Discord.GroupDMChannel);

            console.log(msg.channel instanceof Discord.TextChannel);

            console.log(msg.channel instanceof Discord.CategoryChannel);

            console.log(msg.channel instanceof Discord.GuildChannel);
            console.log(msg.channel instanceof Discord.PartialGuildChannel);

            console.log(msg.channel instanceof Discord.VoiceChannel);

            msg.reply('IM ALIVE \\o/'); // DEBUG
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