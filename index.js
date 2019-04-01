const Discord = require('discord.js');

class LeviGuild {
    /**
     * @param {Discord.Guild} guild The associated guild
     * @param {Addon[]} addons The addons that are enabled or disabled
     * @param {Addon[]} enabledAddon The addonst that are enabled
     */
    constructor(guild, addons = [], enabledAddon = []) {
        this.guild = guild;

        this.addons = addons;
        this.enabledAddon = enabledAddon;
    }

    /**
     * @readonly
     * @returns {Discord.Guild} The associated guild
     */
    get guild() {
        return this.guild;
    }
}

class Addon {
    /**
     * @param {string} id Unique ID 
     * @param {string} name Displayname of the addon
     * @param {string|string[]} author The author(s)
     * @param {Object} defaultData The default data to set for an guild (if any)
     */
    constructor(id, name, author, defaultData = {}) {
        this.id = id;

        this.name = name;
        this.author = (typeof author === 'string') ? [author] : author;

        this.defaultData = defaultData;
    }

    /**
     * @readonly
     * @returns {string} Unique ID
     */
    get id() {
        return this.id;
    }
}