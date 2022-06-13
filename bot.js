const ws = require('ws');
const tmi = require('tmi.js');
const config = require('./settings.json');


const opts = {
    "identity": {
        "username": config.username,
        "password": config.token
    },
    "channels": config.channels
}

const client = new tmi.client(opts);

let osuJson = {};

var connect = function(){
    let websocket = new ws.WebSocket(config.websocket);

    websocket.on('open', function() {
        console.log("Successfully Connected");
        client.connect();
    });

    websocket.onmessage = event => {
        osuJson = JSON.parse(event.data)
    }

    websocket.onerror = () => {
        console.log("Can't connect to gosumemory! Make sure it's turned on before you run this!");
        setTimeout(connect, 2000)
    }
}
connect();

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

let ppCooldown = 0;
let npCooldown = 0;

function onMessageHandler(target, context, msg, self) {
    let date = new Date();

    if (self) { return; }

    console.log("[" + target + "]: " + context.username + " >> " + msg)
    const commandName = msg.trim();

    if (commandName == "!np" | commandName == "!map") {
        if (date.getTime() - 10000 > npCooldown) {
            client.say(target, "@" + context.username + " --> " + assembleNpString());
            npCooldown = date.getTime();
        }
    }
    if (commandName == "!nppp") {
        console.log(date.getTime() - 10000 + " > " + ppCooldown)
        if (date.getTime() - 10000 > ppCooldown) {
            client.say(target, "@" + context.username + " --> " + assemblePpString());
            ppCooldown = date.getTime();
        }
    }
}

function onConnectedHandler(addr, port) {
    console.log(`Connected to ${addr}:${port}`)
}

function assemblePpString() {
    try {
        let title = osuJson.menu.bm.metadata.title;
        let pp = osuJson.menu.pp; 

        return "" + title + ": " + 
        "100% " + pp[100] + 
        "pp; 99% " + pp[99] + 
        "pp; 98% " + pp[98] + 
        "pp; 97% " + pp[97] + 
        "pp; 96% " + pp[96] + 
        "pp; 95% " + pp[95] + "pp";
    }
    catch (e) {
        console.log(e)
    }
}

function assembleNpString() {
    try {
        let metadata = osuJson.menu.bm.metadata;
        let id = osuJson.menu.bm.id;

        return metadata.artist + " - " + metadata.title + " [" + metadata.difficulty + "] Link: https://osu.ppy.sh/b/" + id;
    }
    catch (e) {
        console.log(e)
    }
}