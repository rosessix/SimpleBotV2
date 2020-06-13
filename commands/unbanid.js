const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");

module.exports.run = async (bot, message, args, con) => {
    // Set id and reason
    var id = args[0];

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");

    var query = con.query(
        "UPDATE vrp_users SET banned = ?, reason = null WHERE id = ?",
        [0, id],
        function (error, result, fields) {
            if (error) throw error;
        }
    );

    let unbanEmbed = new Discord.RichEmbed()
        .setTitle("Unban ID: " + id)
        .setColor("#e56b00")
        .setDescription("ID " + id + " blev unbanned af " + message.author)
        .setFooter("Lavet af Ezague");

    let logchannel = message.guild.channels.find(`name`, "bot-logs");
    if (!logchannel)
        return message.channel.send("Kunne ikke finde log kanalen...");

    //message.guild.member(bUser).ban(kReason);
    logchannel.send(unbanEmbed);

    return;
};

module.exports.help = {
    name: "unbanid", //NAVNET ER LIG MED KOMMANDOEN
};