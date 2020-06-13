const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");

module.exports.run = async (bot, message, args, con) => {
    // Set id and reason
    var id = args[0];
    var reason = args.splice(1).join(" ");

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");

    // Run Query
    var query = con.query(
        "UPDATE vrp_users SET banned = ?, reason = ? WHERE id = ?",
        [1, reason, id],
        function (error, result, fields) {
            if (error) throw error;
        }
    );

    let banEmbed = new Discord.RichEmbed()
        .setTitle("Ban ID: " + id)
        .setColor("#e56b00")
        .setDescription(
            "ID " +
            id +
            " blev banned af " +
            message.author +
            " med grunden " +
            reason
        )
        .setFooter("Lavet af Ezague");

    let logchannel = message.guild.channels.find(`name`, "bot-logs");
    if (!logchannel)
        return message.channel.send("Kunne ikke finde log kanalen...");

    //message.guild.member(bUser).ban(kReason);
    logchannel.send(banEmbed);

    return;
};

module.exports.help = {
    name: "banid", //NAVNET ER LIG MED KOMMANDOEN
};