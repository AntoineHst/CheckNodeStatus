Node Status Checker

Overview

Node Status Checker is a simple Node.js application that monitors the status of nodes in a network and sends notifications via Telegram if any nodes are offline. 
It periodically checks the status of nodes and sends a message to a specified Telegram chat if any nodes are found to be offline.

Features

Periodically checks the status of nodes in a network.
Sends notifications via Telegram if any nodes are found to be offline.
Uses Node.js, node-cron for scheduling, node-fetch for HTTP requests, and fs for file system operations.

Installation
Clone the repository:

git clone https://github.com/your-username/node-status-checker.git

Navigate to the project directory:

cd node-status-checker

Install dependencies:

npm install

Set up configuration:

Create a config.json file in the root directory.

Add your Telegram bot token and chat ID in the config.json file:

{
  "TELEGRAM_BOT_TOKEN": "your-telegram-bot-token",
  "TELEGRAM_CHAT_ID": "your-telegram-chat-id"
}

Create a nodes.json and add IP / Port :

[
  {
    "ip": "x.x.x.x",
    "port": xxxx
  }
]

To start the Node Status Checker:

node main.js

This will begin monitoring the status of nodes in the network and sending notifications via Telegram if any nodes are found to be offline.


Configuration

config.json: Contains configuration settings such as the Telegram bot token and chat ID.

Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
