import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateEmotionalResponse(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Bạn là một trợ lý chatbot thân thiện và giàu cảm xúc, luôn cố gắng thấu hiểu và phản hồi một cách ấm áp, tích cực." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant", // Updated to llama-3.1-8b-instant as requested
      temperature: 0.9, // Higher temperature for more creative/emotional responses
    });
    return chatCompletion.choices[0]?.message?.content || "Xin lỗi, tôi đang gặp chút vấn đề. Bạn có thể thử lại sau nhé.";
  } catch (error) {
    console.error('Error generating emotional response with Groq AI:', error);
    return "Xin lỗi, tôi đang gặp chút vấn đề. Bạn có thể thử lại sau nhé.";
  }
}

export async function analyzeTextWithGroq(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Bạn là một trợ lý phân tích văn bản. Khi nhận một văn bản, hãy phân tích cảm xúc của nó (tích cực, tiêu cực, trung tính) và đưa ra một điểm số cảm xúc từ -5 (rất tiêu cực) đến 5 (rất tích cực). Đồng thời, trích xuất 3-5 từ khóa chính CHỈ LIÊN QUAN ĐẾN CẢM XÚC của văn bản. Định dạng kết quả dưới dạng JSON: {\"sentimentLabel\": \"...\", \"sentimentScore\": ..., \"emotionalKeywords\": [...]}." },
        { role: "user", content: text }
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      temperature: 0.5, // Lower temperature for more consistent analysis
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
    return { sentimentLabel: "trung tính", sentimentScore: 0, emotionalKeywords: [] };
  } catch (error) {
    console.error('Error analyzing text with Groq AI:', error);
    return { sentimentLabel: "trung tính", sentimentScore: 0, emotionalKeywords: [] };
  }
}
