function getGuild(obj) {
    if (obj) {
        if (obj instanceof dc.Guild) {
            return obj;
        } else if (obj instanceof dc.Message && obj.guild) {
            return obj.guild;
        }
    }

    return null;
}

module.exports = {
    getLeviGuild: function (obj) {
        let guild = getGuild(obj);

        if (guild) {
            require('./index').getLeviGuild(guild.id);
        }

        return null;
    },
    getGuild
};