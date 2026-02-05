import TelegramBot from 'node-telegram-bot-api';
import { handleMessage } from './bot.js';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID;

// Validate TOKEN (essential for Vercel build/runtime)
if (!TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN không tồn tại. Đảm bảo đã thiết lập trong .env hoặc biến môi trường.');
  // In a Vercel environment, this error will crash the function on startup
  // For local development, we might want to exit, but for Vercel, the runtime handles it.
  // We'll let the error propagate for Vercel.
}

// Initialize bot without polling option for webhook mode
// The bot instance is created once per cold start of the serverless function.
const bot = new TelegramBot(TOKEN);

// Register the message handler once.
// This listener will be triggered by bot.processUpdate(req.body)
bot.on('message', async (msg) => {
  if (ALLOWED_USER_ID && msg.from.id.toString() !== ALLOWED_USER_ID) {
    console.log(`⚠️ Từ chối user ${msg.from.id} (không phải ${ALLOWED_USER_ID})`);
    return;
  }
  await handleMessage(bot, msg);
});

// Export the Vercel serverless function handler
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Process the update from Telegram
      // This will internally emit the 'message' event, triggering our bot.on('message') handler
      await bot.processUpdate(req.body);

      // Respond to Telegram to acknowledge receipt immediately
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error in webhook handler:', error);
      res.status(500).send('Error');
    }
  } else {
    // For GET requests, indicate that the webhook endpoint is ready
    res.status(200).send('Bot is running and listening for webhooks.');
  }
};
