# Node Status Checker

## Overview

Node Status Checker is a simple Node.js application that monitors the status of nodes in a network and sends notifications via Telegram if any nodes are offline. It periodically checks the status of nodes and sends a message to a specified Telegram chat if any nodes are found to be offline.

## Features

- Periodically checks the status of nodes in a network.
- Sends notifications via Telegram if any nodes are found to be offline.
- Uses Node.js, node-cron for scheduling, node-fetch for HTTP requests, and fs for file system operations.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/node-status-checker.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd node-status-checker
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up configuration:**

    - Create a `config.json` file in the root directory.
    - Add your Telegram bot token and chat ID in the `config.json` file:

        ```json
        {
          "TELEGRAM_BOT_TOKEN": "your-telegram-bot-token",
          "TELEGRAM_CHAT_ID": "your-telegram-chat-id"
        }
        ```

5. **Create a `nodes.json` file and add IP / Port:**

    ```json
    [
      {
        "ip": "x.x.x.x",
        "port": xxxx
      }
    ]
    ```

## Usage

To start the Node Status Checker:

```bash
node main.js
