import { processMessage, isMoodScore } from './core/logger.js';
import { generateWeeklySummary } from './core/analyzer.js';
import { generateEmotionalResponse } from './core/groq.js'; // Import Groq AI function

/**
 * Xử lý message từ Telegram
 */
export async function handleMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) {
    return;
  }

  try {
    if (text === '/start') {
      await bot.sendMessage(
        chatId,
        'Bot ghi mood cá nhân.\n\n' +
        'Gửi số 1-10 để ghi mood.\n' +
        'Gửi /summary để xem báo cáo tuần.\n' +
        'Gửi bất kỳ để dump suy nghĩ.'
      );
      return;
    }

    if (text === '/summary') {
      const summary = await generateWeeklySummary();
      await bot.sendMessage(chatId, summary);
      return;
    }

    await processMessage(text); // Process and log the message
    const groqPrompt = `Người dùng vừa ghi lại một ${isMoodScore(text) ? 'tâm trạng' : 'suy nghĩ'}: "${text}". Hãy phản hồi một cách ấm áp, động viên về việc đã ghi nhận thành công.`;
    const emotionalResponse = await generateEmotionalResponse(groqPrompt); // Use Groq AI for emotional response
    await bot.sendMessage(chatId, emotionalResponse);

  } catch (error) {
    console.error('Error handling message:', error);
    await bot.sendMessage(chatId, 'Có lỗi xảy ra khi xử lý.');
  }
}
