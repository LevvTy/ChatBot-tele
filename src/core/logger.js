import { addEntry } from './storage.js';
import { analyzeTextWithGroq } from './groq.js'; // Import Groq AI analysis function

/**
 * Kiểm tra xem text có phải là mood score (số 1-10) không
 */
export function isMoodScore(text) {
  const trimmed = text.trim();
  const num = parseInt(trimmed, 10);
  return trimmed === num.toString() && num >= 1 && num <= 10;
}

/**
 * Log mood score
 */
export async function logMood(score, originalText) {
  const groqAnalysis = await analyzeTextWithGroq(originalText); // Analyze with Groq AI
  const entry = {
    timestamp: new Date().toISOString(),
    type: 'mood',
    score: score,
    text: originalText,
    sentiment: {
      label: groqAnalysis.sentimentLabel,
      score: groqAnalysis.sentimentScore,
      keywords: groqAnalysis.emotionalKeywords
    }
  };

  await addEntry(entry);
  return entry;
}

/**
 * Log dump (thought/note)
 */
export async function logDump(text) {
  const groqAnalysis = await analyzeTextWithGroq(text); // Analyze with Groq AI
  const entry = {
    timestamp: new Date().toISOString(),
    type: 'dump',
    text: text,
    sentiment: {
      label: groqAnalysis.sentimentLabel,
      score: groqAnalysis.sentimentScore,
      keywords: groqAnalysis.emotionalKeywords
    }
  };

  await addEntry(entry);
  return entry;
}

/**
 * Xử lý message từ user
 */
export async function processMessage(text) {
  if (isMoodScore(text)) {
    const score = parseInt(text.trim(), 10);
    return await logMood(score, text);
  } else {
    return await logDump(text);
  }
}
