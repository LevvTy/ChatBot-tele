import { readEntries } from './storage.js';

/**
 * Lấy entries trong 7 ngày gần nhất
 */
function getLastWeekEntries(entries) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    return entryDate >= oneWeekAgo;
  });
}

/**
 * Tính mood statistics
 */
function calculateMoodStats(moodEntries) {
  if (moodEntries.length === 0) {
    return null;
  }

  const scores = moodEntries.map(e => e.score);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);

  return {
    average: Math.round(average * 10) / 10,
    highest,
    lowest,
    count: moodEntries.length
  };
}

/**
 * Tính sentiment statistics
 */
function calculateSentimentStats(entries) {
  if (entries.length === 0) {
    return null;
  }

  const sentimentScores = entries
    .filter(entry => entry.sentiment && typeof entry.sentiment.score === 'number')
    .map(entry => entry.sentiment.score);

  if (sentimentScores.length === 0) {
    return null;
  }

  const averageSentiment = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length;
  const mostPositive = entries.reduce((prev, current) => {
    if (!prev.sentiment || !current.sentiment) return prev;
    return (prev.sentiment.score > current.sentiment.score) ? prev : current;
  });
  const mostNegative = entries.reduce((prev, current) => {
    if (!prev.sentiment || !current.sentiment) return prev;
    return (prev.sentiment.score < current.sentiment.score) ? prev : current;
  });

  return {
    average: Math.round(averageSentiment * 100) / 100,
    mostPositive: mostPositive.text,
    mostNegative: mostNegative.text
  };
}

/**
 * Tạo summary tuần
 */
export async function generateWeeklySummary() {
  const allEntries = await readEntries();
  const weekEntries = getLastWeekEntries(allEntries);

  if (weekEntries.length === 0) {
    return 'Không có dữ liệu trong tuần qua.';
  }

  const moodEntries = weekEntries.filter(e => e.type === 'mood');
  const dumpEntries = weekEntries.filter(e => e.type === 'dump');

  const moodStats = calculateMoodStats(moodEntries);
  const sentimentStats = calculateSentimentStats(weekEntries); // Calculate sentiment for all entries

  let summary = '📊 Báo cáo 7 ngày qua\n\n';

  if (moodStats) {
    summary += `🌈 Mood của bạn:\n`;
    summary += `• Trung bình: ${moodStats.average}/10\n`;
    summary += `• Cao nhất: ${moodStats.highest}/10\n`;
    summary += `• Thấp nhất: ${moodStats.lowest}/10\n`;
    summary += `• Số lần ghi: ${moodStats.count}\n\n`;
  } else {
    summary += 'Mood: Chưa ghi mood nào trong tuần này.\n\n';
  }

  if (sentimentStats) {
    summary += `✨ Phân tích cảm xúc:\n`;
    summary += `• Cảm xúc trung bình: ${sentimentStats.average}\n`;
    summary += `• Khoảnh khắc tích cực nhất: "${sentimentStats.mostPositive}"\n`;
    summary += `• Khoảnh khắc tiêu cực nhất: "${sentimentStats.mostNegative}"\n\n`;
  }

  summary += `Tổng số mục đã ghi: ${weekEntries.length}\n`;
  summary += `• Mood: ${moodEntries.length}\n`;
  summary += `• Dump: ${dumpEntries.length}\n\n`;

  return summary;
}
