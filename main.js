const Discord = require('discord.js');
const follow = require('text-file-follower');
const fs = require('fs');
const colors = require('colors');
const config = require('./settings.json');

const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

let waitFor = (ms) => new Promise(r => setTimeout(r, ms));
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

let initialized = false;

Pre()
async function Pre() {
    console.log("");
    console.log(colors.green("██████╗  █████╗ ██╗   ██╗███████╗"), colors.grey("███████╗███████╗███████╗██████╗ "))
    console.log(colors.green("██╔══██╗██╔══██╗╚██╗ ██╔╝╚══███╔╝"), colors.grey("██╔════╝██╔════╝██╔════╝██╔══██╗"))
    console.log(colors.green("██║  ██║███████║ ╚████╔╝   ███╔╝ "), colors.grey("█████╗  █████╗  █████╗  ██║  ██║"))
    console.log(colors.green("██║  ██║██╔══██║  ╚██╔╝   ███╔╝  "), colors.grey("██╔══╝  ██╔══╝  ██╔══╝  ██║  ██║"))
    console.log(colors.green("██████╔╝██║  ██║   ██║   ███████╗"), colors.grey("██║     ███████╗███████╗██████╔╝"))
    console.log(colors.green("╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝"), colors.grey("╚═╝     ╚══════╝╚══════╝╚═════╝ "))
    console.log("");
    fs.existsSync(config.AdminLogName) ? (console.log("STARTED.. waiting for new Feeds".yellow), initialized = true) : console.log("LOGFILE NOT FOUND..".red)
}

var follower = follow(config.AdminLogName);
follower.on('line', function(filename, line) {
    //PLAYER NOTIFICATIONS
    if (line.includes(' | Player "')) {
        if (line.includes("is connected")) SendDiscordWebhook(line.split("(id=")[0]);
        if (line.includes(" has been disconnected")) SendDiscordWebhook(line.split("(id=")[0] + " has been disconnected");
        if (line.includes("committed suicide")) SendDiscordWebhook(line.split("(id=")[0] + "committed suicide");

        if (line.includes("killed")) {
            let line1, line2, line3

            line1 = line.split("(DEAD) (id=")[0]
            line2 = line.split("(DEAD) (id=")[1].split(")")[1].split("(")[0].substring(1)
            line3 = line.split("with")[1] ? "with" + line.split("with")[1] : line3 = ""

            SendDiscordWebhook(line1 + line2 + line3);
        }

        //PLAYER-CHAT NOTIFICATIONS
    } else if (line.includes(' | Chat("')) {
        //console.log(line);
    }
});


async function SendDiscordWebhook(message) {

    console.log(message);
    webhookClient.send(message)
}