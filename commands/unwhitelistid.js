const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");

module.exports.run = async (bot, message, args, con) => {
    // Set id and reason
    var id = args[0];

    // Run Query
    var query = con.query(
        "UPDATE vrp_users SET whitelisted = ? WHERE id = ?",
        [0, id],
        function (error, result, fields) {
            if (error) throw error;
        }
    );

    let unwhitelistEmbed = new Discord.RichEmbed()
        .setTitle("Unwhitelist ID: " + id)
        .setColor("#e56b00")
        .setDescription("ID " + id + " blev unwhitelistet af " + message.author)
        .setFooter("Lavet af Ezague");

    let logchannel = message.guild.channels.find(`name`, "bot-logs");
    if (!logchannel)
        return message.channel.send("Kunne ikke finde log kanalen...");

    //message.guild.member(bUser).ban(kReason);
    logchannel.send(unwhitelistEmbed);

    return;
};

module.exports.help = {
    name: "unwhitelistid", //NAVNET ER LIG MED KOMMANDOEN
};