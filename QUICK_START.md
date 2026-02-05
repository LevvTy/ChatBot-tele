# Quick Start Guide

## Bước 1: Cài đặt dependencies

Nếu chưa cài:
```bash
npm install
```

## Bước 2: Tạo Telegram Bot

1. Mở Telegram
2. Tìm **@BotFather**
3. Gửi lệnh: `/newbot`
4. Nhập tên bot: `My Mental Log Bot`
5. Nhập username bot: `my_mental_log_bot` (phải kết thúc bằng `_bot`)
6. BotFather sẽ gửi token, copy token đó

## Bước 3: Cấu hình

Tạo file `.env`:
```bash
cp .env.example .env
```

Hoặc trên Windows:
```bash
copy .env.example .env
```

Mở file `.env` và paste token:
```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
ALLOWED_USER_ID=
```

## Bước 4: Chạy bot

```bash
npm start
```

Bạn sẽ thấy:
```
✅ Bot đã khởi động
```

## Bước 5: Test bot

1. Mở Telegram
2. Tìm bot của bạn (theo username vừa tạo)
3. Gửi `/start`
4. Test các lệnh:
   - Gửi `7` → Bot lưu mood
   - Gửi `Hôm nay mệt` → Bot lưu dump
   - Gửi `/summary` → Bot hiện báo cáo

## Troubleshooting

**Lỗi: TELEGRAM_BOT_TOKEN không tồn tại**
- Kiểm tra file `.env` đã tạo chưa
- Kiểm tra token đã paste đúng chưa

**Bot không phản hồi**
- Kiểm tra bot đang chạy (`npm start`)
- Kiểm tra đã gửi `/start` cho bot chưa
- Kiểm tra console có lỗi không

**Muốn dừng bot**
- Nhấn `Ctrl + C` trong terminal
