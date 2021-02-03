var config = require(__dirname + "/settings.json");
var tmi = require('tmi.js');
var fs = require("fs");
const path = require('path');
const sound = require("sound-play");

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

if (config.login.channelname && config.login.oauth){

    var client = new tmi.Client({
        options: { debug: true },
        connection: { reconnect: true },
        identity: {
            username: config.login.channelname,
            password: config.login.oauth
        },
        channels: [ config.login.channelname ]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {

        if (tags["custom-reward-id"]){

            reward_id = tags["custom-reward-id"];
            document.getElementById("set_code").innerHTML = reward_id;

        };

        for (s in config.sounds){
            
            if (config.sounds[s][0] == tags["custom-reward-id"]){

                var soundname = s

                var files = fs.readdirSync(__dirname + "/sounds/" + soundname + "/")
                let chosenFile = files[Math.floor(Math.random() * files.length)]
                sound.play(__dirname + "/sounds/"+ soundname + "/" + chosenFile, config.sounds[s][1]);


            }
        }

    })
};