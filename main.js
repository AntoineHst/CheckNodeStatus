const cron = require('node-cron');
const fs = require('fs');

async function loadFetch() {
  return (await import('node-fetch')).default;
}

async function sendTelegramMessage(message) {
  const fetch = await loadFetch();
  const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
  const TELEGRAM_BOT_TOKEN = config.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = config.TELEGRAM_CHAT_ID;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });
    console.log('Message sent to Telegram');
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
}

async function fetchNodeInfo(node) {
  const fetch = await loadFetch();
  const url = `http://${node.ip}:${node.port}/quilibrium.node.node.pb.NodeService/GetTokenInfo`;
  try {
    await fetch(url, { method: 'POST' });
    
    return { ip: node.ip, port: node.port, status: 'Online' };
  } catch (error) {
    console.log('Offline ' + node.ip);
    return { ip: node.ip, port: node.port, status: 'Offline' };
  }
}

async function checkNodes() {
  const nodes = JSON.parse(fs.readFileSync('nodes.json', 'utf-8'));
  const promises = nodes.map((node) => fetchNodeInfo(node));
  const results = await Promise.all(promises);

  const offlineNodes = results.filter((node) => node.status === 'Offline');
  if (offlineNodes.length > 0) {
    const offlineMessage = offlineNodes.map((node) => `${node.ip}:${node.port}`).join('\n');
    const message = `⚠️ The following nodes are offline:\n${offlineMessage}`;
    await sendTelegramMessage(message);
  } else {
    console.log('All nodes are online');
  }
}

// Schedule the check to run every 2 minutes
cron.schedule('*/2 * * * *', () => {
  console.log('Checking nodes...');
  checkNodes();
});

// Initial check
checkNodes();
