const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");

module.exports.run = async (bot, message, args, con) => {
    var id = args[0];

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");

    if (!id)
        return message.reply("du skal definere en bruger du gerne vil finde");
    // console.log(message.member.user.id.toString(tUser))

    con.query("SELECT * FROM vrp_users WHERE id = ?", [id], function (
        err,
        result
    ) {
        if (err) throw err;
        if (result[0].banned == 0) {
            return message.reply("ID " + id + " er ikke banned fra serveren.");
        } else if (result[0].banned == 1) {
            message.reply(
                "ID: " + id + " Er blevet banned med grundlaget: " + result[0].reason
            );
        }
    });
};

module.exports.help = {
    name: "bangrundlag",
};