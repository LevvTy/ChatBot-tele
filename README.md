# Mental Log Bot

Bot Telegram cá nhân để ghi mood và dump suy nghĩ hằng ngày.

## Tính năng

- ✅ Ghi mood (1-10)
- ✅ Ghi dump (thoughts/notes)
- ✅ Báo cáo tuần với mood stats và keywords
- ✅ Lưu trữ local bằng JSON
- ✅ Phản hồi trung tính, không phán xét

## Cài đặt

### 1. Clone/Download code

### 2. Cài dependencies

```bash
npm install
```

### 3. Tạo Telegram Bot

1. Mở Telegram, tìm `@BotFather`
2. Gửi `/newbot`
3. Đặt tên và username cho bot
4. Copy token mà BotFather gửi cho bạn

### 4. Cấu hình

Tạo file `.env` từ template:

```bash
cp .env.example .env
```

Sửa file `.env`:

```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
ALLOWED_USER_ID=
```

**Optional:** Nếu muốn chỉ cho phép 1 user duy nhất:
- Gửi tin nhắn cho `@userinfobot` trên Telegram
- Copy User ID
- Điền vào `ALLOWED_USER_ID`

### 5. Chạy bot

```bash
npm start
```

Hoặc dùng watch mode (tự restart khi code thay đổi):

```bash
npm run dev
```

## Sử dụng

### Ghi mood
Gửi số từ 1-10:
```
5
```

Bot trả lời: `Ok, tao ghi lại rồi.`

### Dump thoughts
Gửi bất kỳ text nào:
```
Hôm nay mệt vl, deadline chồng chất
```

Bot trả lời: `Ghi rồi.`

### Xem báo cáo tuần
```
/summary
```

Bot trả về:
```
📊 Báo cáo 7 ngày qua

Mood:
• Trung bình: 6.5/10
• Cao nhất: 9/10
• Thấp nhất: 3/10
• Số lần ghi: 12

Tổng số entry: 28
• Mood: 12
• Dump: 16

Từ xuất hiện nhiều:
• deadline
• mệt
• work
• stress
• coffee
```

## Cấu trúc dữ liệu

File `data/entries.json`:

```json
[
  {
    "timestamp": "2026-02-05T10:30:00.000Z",
    "type": "mood",
    "score": 7,
    "text": "7"
  },
  {
    "timestamp": "2026-02-05T14:20:00.000Z",
    "type": "dump",
    "text": "Meeting dài 3 tiếng, brain fog"
  }
]
```

## Kiến trúc

```
src/
├── index.js              # Entry point, khởi tạo Telegram bot
├── bot.js                # Handler cho Telegram messages
├── core/
│   ├── storage.js        # Đọc/ghi file JSON
│   ├── logger.js         # Logic ghi mood/dump
│   └── analyzer.js       # Tính toán summary
└── utils/
    └── keywords.js       # Extract keywords từ text
```

## Lưu ý

- Bot này là tool cá nhân, chỉ lưu local
- Không có cloud sync
- Không có mã hóa
- Data ở `data/entries.json` - backup thường xuyên nếu cần

## License

MIT
