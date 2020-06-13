const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Du har ikke adgang til at slette beskeder.");
    if (!args[0]) return message.channel.send("Du skal skrive et tal");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel
            .send(`Slettede ${args[0]} beskeder.`)
            .then(msg => msg.delete(2000));
    });
};

module.exports.help = {
    name: "purge"
};