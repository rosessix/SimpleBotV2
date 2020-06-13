const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    //HER SKAL DIN KOMMANDO VÆRE

    let findRole = message.guild.roles.find(r => r.name === args[1]);

    let member = message.mentions.members.first();

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");

    if (!member) return message.reply("du skal tagge en person");

    if (!findRole) return message.reply("kunne ikke finde rollen");

    member.addRole(findRole);
    message.channel.send(`${findRole} er blevet tilføjet til ${member}`);
};

module.exports.help = {
    name: "addrole" //NAVNET ER LIG MED KOMMANDOEN
};