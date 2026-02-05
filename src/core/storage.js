import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

/**
 * Đảm bảo data directory tồn tại
 */
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Đọc tất cả entries từ file
 */
export async function readEntries() {
  await ensureDataDir();

  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Ghi tất cả entries vào file
 */
export async function writeEntries(entries) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

/**
 * Thêm một entry mới
 */
export async function addEntry(entry) {
  const entries = await readEntries();
  entries.push(entry);
  await writeEntries(entries);
  return entry;
}
