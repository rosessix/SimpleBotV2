const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");

module.exports.run = async (bot, message, args, con) => {
    var id = args[0];
    var group = args[1];
    var settf = args[2].toLowerCase() == "true";

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");

    if (!id)
        return message.reply("du skal definere en bruger du gerne vil finde");
    // console.log(message.member.user.id.toString(tUser))

    con.query("SELECT * FROM vrp_user_data WHERE user_id = ?", [id], function (
        err,
        result
    ) {
        if (err) throw err;

        var dvalue = JSON.parse(result[0].dvalue);

        dvalue["groups"][group] = settf;

        con.query(
            "UPDATE vrp_user_data SET dvalue = ? WHERE user_id = ?",
            [JSON.stringify(dvalue), id],
            function (err, result) { }
        );
    });
};

module.exports.help = {
    name: "rank", //NAVNET ER LIG MED KOMMANDOEN
};