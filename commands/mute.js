const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    //!tempmute @user 1s/m/h/d

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let staffRole = message.guild.roles.find("name", "Staff");

    let mUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!mUser) return message.reply("Kan ikke finde brugeren.");
    if (!message.member.roles.has(staffRole))
        return message.reply("du har ikke tilladelse til at mute personer!");
    if (message.member.roles.has(staffRole))
        return message.channel.send("Denne person kan ikke mutes!");
    let muterole = message.guild.roles.find(
        (muterole) => muterole.name === "muted"
    );

    //start of create role
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: [],
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    //end of create role
    let mutetime = args[1];
    if (!mutetime) return message.reply("Du skal angive en tid!");

    await mUser.addRole(muterole.id);
    message.reply(`<@${mUser.id}> er blevet muted i ${ms(ms(mutetime))}`);

    setTimeout(function () {
        mUser.removeRole(muterole.id);
        message.channel.send(`<@${mUser.id}> er blevet unmuted!`);
    }, ms(mutetime));

    let muteEmbed = new Discord.RichEmbed()
        .setDescription("Mute")
        .setColor("#e56b00")
        .addField("Mutede:", `${mUser} med ID'et ${mUser.id}`)
        .addField(
            "Mutede af:",
            `<@${message.author.id}> med ID'et ${message.author.id}`
        )
        .addField("Mutede i:", message.channel)
        .addField("Klokken:", message.createdAt)
        .addField("Tid:", `${mutetime}`)
        .setFooter("Lavet af Ezague");

    let muteChannel = message.guild.channels.find(`name`, "bot-logs");
    if (!muteChannel)
        return message.channel.send("Kunne ikke finde log kanalen..");

    muteChannel.send(muteEmbed);

    return;

    //end of module
};

module.exports.help = {
    name: "mute",
};