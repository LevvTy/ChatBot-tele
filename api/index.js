import TelegramBot from 'node-telegram-bot-api';
import { handleMessage } from './bot.js';

// Lazy-initialized bot instance
let botInstance = null;

// Export the Vercel serverless function handler
export default async (req, res) => {
  // Lazily import dotenv for local development only if not in production
  if (process.env.NODE_ENV !== 'production' && !process.env.TELEGRAM_BOT_TOKEN) {
    const dotenv = await import('dotenv');
    dotenv.config();
  }

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID;

  // Log environment variables for debugging on Vercel
  console.log('Vercel ENV Debug: TOKEN present:', !!TOKEN);
  console.log('Vercel ENV Debug: ALLOWED_USER_ID present:', !!ALLOWED_USER_ID);
  console.log('Vercel ENV Debug: GROQ_API_KEY present:', !!process.env.GROQ_API_KEY);

  if (!TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is not set. Cannot initialize bot.');
    // Important: respond with 200 OK to Telegram even if token is missing
    // to avoid continuous webhook attempts/errors from Telegram.
    return res.status(200).send('Bot Token is not configured, but received update.');
  }

  // Initialize bot instance once per cold start of the serverless function.
  // This ensures the TOKEN is always available when the bot is created.
  if (!botInstance) {
    botInstance = new TelegramBot(TOKEN);
    // Register the message handler once for the bot instance.
    // This listener will be triggered by bot.processUpdate(req.body).
    botInstance.on('message', async (msg) => {
      if (ALLOWED_USER_ID && msg.from.id.toString() !== ALLOWED_USER_ID) {
        console.log(`⚠️ User ${msg.from.id} is not allowed to use the bot.`);
        return;
      }
      await handleMessage(botInstance, msg);
    });
  }

  if (req.method === 'POST') {
    try {
      // Process the update from Telegram
      await botInstance.processUpdate(req.body);
      // Respond to Telegram to acknowledge receipt immediately
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error processing update:', error);
      // Log the specific error from bot.processUpdate for debugging
      if (error instanceof Error && error.message.includes('401')) {
          console.error('Possible token mismatch or unauthorized update received by node-telegram-bot-api.');
      }
      res.status(500).send('Error processing update.');
    }
  } else {
    // For GET requests, indicate that the webhook endpoint is ready
    res.status(200).send('Bot is running and listening for webhooks.');
  }
};
