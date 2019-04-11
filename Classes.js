const Discord = require('discord.js');

class LeviGuild {
    /**
     * @param {Discord.Guild} guild The associated guild
     * 
     * @param {Object} settings Guild's settings
     * @param {boolean} settings.ignoreBots Should messages by bots be ignored
     * 
     * @param {Addon[]} addons The addons that are enabled or disabled
     * @param {Addon[]} enabledAddon The addonst that are enabled
     */
    constructor(guild, settings = {}, addons = [], enabledAddon = []) {
        this._guild = guild;

        this.settings = settings;

        this.addons = addons;
        this.enabledAddon = enabledAddon;
    }

    /**
     * @readonly
     * @returns {Discord.Guild} The associated guild
     */
    get guild() {
        return this._guild;
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
        this._id = id;

        this.name = name;
        this.author = (typeof author === 'string') ? [author] : author;

        this.defaultData = defaultData;
    }

    /**
     * @readonly
     * @returns {string} Unique ID
     */
    get id() {
        return this._id;
    }
}

class AddonTemplate {
    constructor(id, name, defaultData = {}) {
        this._id = id;

        this._name = name;

        this._defaultData = defaultData;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this.name;
    }

    get defaultData() {
        return this._defaultData;
    }
}

/* Templates */

module.exports.AddonTemplates = {
    COMMAND: new AddonTemplate(1, 'Template: Command', { name: 'Befehl-Bezeichnung', commands: ['command', 'cmd'] })
};