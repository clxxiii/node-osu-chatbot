# Node.js osu! chatbot
This is a simple program for using !np and !nppp commands in twitch chat.

**This bot pulls data from [gosumemory](https://github.com/l3lackShark/gosumemory) to generate the data, so it is necessary that it is set up.**

## Dependencies:

* [nodejs](https://nodejs.org/en/)
* [gosumemory](https://github.com/l3lackShark/gosumemory)

# Setting it up yourself
If you'd like to self host, it's recommended that you have some kind of server so that it is always running. If you don't have that, you can use a package like [pm2](https://pm2.keymetrics.io/) to run it in the background. Alternatively, you can just use the `start.bat` file that will run the program, so you can start it up whenever you start streaming.

## Here are the steps:

### 0. Install [nodejs](https://nodejs.org/en/) and [gosumemory](https://github.com/l3lackShark/gosumemory)

### 1. Clone the repository, install the dependencies
```bash
git clone https://github.com/clxxiii/node-osu-chatbot.git
npm install
```

### 2. Fill the settings.json

This file contains 4 properties
- `username` The username for the twitch account you'd like to act as your bot
- `token` Your authentication token, [get one from here](https://twitchapps.com/tmi/) (Make sure you're signed into the right account!)
- `websocket` The link to your gosumemory websocket (If you have no clue what this is, leave it as it is in the example)
- `channels` An array of channels to connect to.

**Example `settings.json`**
```json
{
    "username": "clxxiii",
    "token": "oauth:1234567890abcdefg",
    "websocket": "ws://127.0.0.1:24050/ws",
    "channels": [ "clxxiii" ]
}
```

### 3. Launch gosumemory

### 4. Launch bot using `start.bat`

### Steps 5-7 (Optional)
If you'd like the program to run automatically on your computer or on a server, first install pm2
```bash
npm install -g pm2
```
Then, navigate to your install folder, and run the following command:
```bash
pm2 start bot.js --name node-osu-chatbot
```
Finally, save your settings so pm2 will start the bot automatically on reboot:
```js
pm2 startup // If you're using pm2 for the first time

pm2 save
```
