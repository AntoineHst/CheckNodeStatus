const fs = require('fs');

async function getChatId() {
  const fetch = (await import('node-fetch')).default;

  // Charger la configuration depuis config.json
  const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

  const TELEGRAM_BOT_TOKEN = config.TELEGRAM_BOT_TOKEN;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.ok && data.result.length > 0) {
      const chatId = data.result[0].message.chat.id;
      console.log('Your chat ID:', chatId);
      return chatId;
    } else {
      console.error('No messages found or unable to get updates');
    }
  } catch (error) {
    console.error('Error fetching updates:', error);
  }
}

getChatId();
