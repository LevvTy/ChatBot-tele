import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmotionalResponse(prompt) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", // Or gpt-3.5-turbo, depending on your preference and access
      messages: [
        { role: "system", content: "Bạn là một trợ lý chatbot thân thiện và giàu cảm xúc, luôn cố gắng thấu hiểu và phản hồi một cách ấm áp, tích cực." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9, // Higher temperature for more creative/emotional responses
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating emotional response with GPT-4:', error);
    return "Xin lỗi, tôi đang gặp chút vấn đề. Bạn có thể thử lại sau nhé.";
  }
}
