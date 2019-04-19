const Discord = require('discord.js');
const Levi = require('./classes');

const fs = require('fs');
const steno = require('steno');

initStorage();

module.exports = { getLeviGuilds, storeLeviGuilds, mkdirs };

module.exports.cfg = require('./storage/config.json');


/* Functions */
function initStorage() {
    if (!fs.existsSync('./storage/')) {
        mkdirs('./storage/');
    }

    if (!fs.existsSync('./storage/config.json')) {
        fs.writeFileSync('./storage/config.json', JSON.stringify({
            BotToken: 'Discord-Bot-Token'
        }, null, 4));
    }
}

function mkdirs(dirPath, callback) {
    if (typeof dirPath === 'function') {
        dirPath = dirPath();
    }

    const fs = require('fs');
    const path = require('path');

    dirPath = path.resolve(dirPath);

    try {
        if (!fs.existsSync(dirPath)) {
            var tempPath;

            dirPath.split(/[/\\]/).forEach((dirName) => {
                tempPath ? tempPath = path.join(tempPath, dirName) : tempPath = dirName;

                if (!fs.existsSync(tempPath)) {
                    fs.mkdirSync(tempPath);
                }
            });
        }

        if (callback) {
            callback();
        }

        return true;
    } catch (err) {
        if (callback) {
            callback(err);
        }

        return false;
    }
}

/* . . . */

function getLeviGuilds(client) {
    let result = new Discord.Collection();

    if (fs.existsSync('./storage/LeviGuilds.json')) {
        let json = JSON.parse(fs.readFileSync('./storage/LeviGuilds.json'));

        for (const guildID in json) {
            if (json.hasOwnProperty(guildID)) {
                let elem = json[guildID];

                result.set(guildID, new Levi.LeviGuild(client.guilds.get(guildID), elem.settings, elem.addons, elem.enabledAddons))
            }
        }
    }

    return result;
}

/**
 * 
 * @param {Discord.Collection<String, LeviGuild>} leviGuilds 
 */
function storeLeviGuilds(leviGuilds) {
    let json = {};

    for (const entry of leviGuilds.keys()) {
        let lGuild = leviGuilds.get(entry);

        json[entry] = {
            settings: lGuild.settings,
            addons: lGuild.addons,
            enabledAddons: lGuild.enabledAddons
        };
    }

    let data = JSON.stringify(json);

    if (!fs.existsSync('./storage/')) {
        mkdirs('./storage/');
    }

    steno.writeFile('./storage/LeviGuilds.json', data, (err) => {
        if (err) {
            throw err;
        }
    });
}