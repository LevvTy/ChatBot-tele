/**
 * Stop words tiếng Việt đơn giản
 */
const STOP_WORDS = new Set([
  'là', 'của', 'và', 'có', 'được', 'trong', 'không', 'một', 'này', 'với',
  'để', 'cho', 'các', 'như', 'đã', 'về', 'người', 'năm', 'những', 'khi',
  'tôi', 'mà', 'từ', 'bị', 'nó', 'thì', 'rất', 'đó', 'sau', 'bởi',
  'tao', 'mày', 'ở', 'cái', 'còn', 'vào', 'do', 'nếu', 'thế', 'nào',
  'ngày', 'giờ', 'lúc', 'hôm', 'qua', 'nay', 'mai', 'đang', 'sẽ', 'cũng',
  'anh', 'em', 'chị', 'bạn', 'đi', 'làm', 'ăn', 'uống', 'ngủ', 'dậy',
  'đến', 'ra', 'vào', 'lên', 'xuống', 'lại', 'rồi', 'chỉ', 'muốn', 'phải',
  'biết', 'thấy', 'nghe', 'nói', 'làm', 'cho', 'xin', 'cảm', 'ơn', 'chúc',
  'mong', 'hy', 'vọng', 'sợ', 'ghét', 'yêu', 'thích', 'buồn', 'vui', 'khóc',
  'cười', 'giận', 'hờn', 'tức', 'giận', 'lo', 'lắng', 'stress', 'áp', 'lực',
  'mệt', 'mỏi', 'chán', 'nản', 'tồi', 'tệ', 'kém', 'ổn', 'đẹp', 'xấu',
  'tốt', 'quá', 'rất', 'hơi', 'khá', 'ít', 'nhiều', 'hơn', 'kém', 'nhất',
  'nhì', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'lần',
  'cuộc', 'sống', 'việc', 'chuyện', 'gì', 'đâu', 'khi nào', 'ở đâu', 'tại sao',
  'vậy', 'thế', 'à', 'ạ', 'ơi', 'nhé', 'nhỉ', 'nhà', 'trường', 'học', 'tập',
  'làm', 'việc', 'nghỉ', 'ngơi', 'chơi', 'bời', 'điện', 'thoại', 'máy', 'tính',
  'game', 'phim', 'nhạc', 'sách', 'báo', 'tin', 'tức', 'thông', 'tin', 'video',
  'hình', 'ảnh', 'âm', 'thanh', 'email', 'chat', 'nhắn', 'gọi', 'điện', 'thoại',
  'gửi', 'nhận', 'trả', 'lời', 'hỏi', 'đáp', 'tìm', 'kiếm', 'thấy', 'nhìn',
  'xem', 'nghe', 'nếm', 'ngửi', 'chạm', 'cảm', 'giác', 'suy', 'nghĩ', 'phân',
  'tích', 'đánh', 'giá', 'nhận', 'xét', 'bình', 'luận', 'tham', 'gia', 'chia',
  'sẻ', 'hỗ', 'trợ', 'giúp', 'đỡ', 'cải', 'thiện', 'phát', 'triển', 'tiến',
  'bộ', 'thành', 'công', 'thất', 'bại', 'khó', 'khăn', 'thuận', 'lợi', 'cơ',
  'hội', 'thách', 'thức', 'mục', 'tiêu', 'kế', 'hoạch', 'chiến', 'lược', 'ý',
  'tưởng', 'quan', 'trọng', 'cần', 'thiết', 'khẩn', 'cấp', 'ưu', 'tiên', 'mới',
  'cũ', 'hiện', 'tại', 'tương', 'lai', 'quá', 'khứ', 'sáng', 'tối', 'trắng',
  'đen', 'đỏ', 'vàng', 'xanh', 'tím', 'nâu', 'cam', 'hồng', 'xám', 'bạc', 'vàng',
  'kim', 'cương', 'ngọc', 'trai', 'đá', 'quý', 'kim', 'loại', 'gỗ', 'nhựa',
  'thủy', 'tinh', 'vải', 'sợi', 'giấy', 'mực', 'bút', 'sách', 'vở', 'bảng',
  'phấn', 'máy', 'chiếu', 'màn', 'hình', 'loa', 'mic', 'tai', 'nghe', 'camera',
  'ảnh', 'video', 'chụp', 'quay', 'ghi', 'âm', 'biên', 'tập', 'chỉnh', 'sửa',
  'thiết', 'kế', 'lập', 'trình', 'mã', 'nguồn', 'phần', 'mềm', 'phần', 'cứng',
  'mạng', 'internet', 'web', 'site', 'ứng', 'dụng', 'hệ', 'thống', 'dữ', 'liệu',
  'bảo', 'mật', 'an', 'toàn', 'riêng', 'tư', 'công', 'khai', 'cộng', 'đồng',
  'xã', 'hội', 'nghiên', 'cứu', 'phân', 'tích', 'thống', 'kê', 'báo', 'cáo',
  'dự', 'đoán', 'đánh', 'giá', 'giải', 'quyết', 'vấn', 'đề', 'thử', 'nghiệm',
  'kiểm', 'tra', 'sửa', 'chữa', 'cải', 'tiến', 'tối', 'ưu', 'hóa', 'nâng',
  'cấp', 'cập', 'nhật', 'mở', 'rộng', 'thu', 'hẹp', 'bắt', 'đầu', 'kết', 'thúc',
  'tiếp', 'tục', 'ngừng', 'lại', 'tạm', 'dừng', 'kết', 'quả', 'thành', 'công',
  'thất', 'bại', 'lỗi', 'sai', 'đúng', 'chính', 'xác', 'hiệu', 'quả', 'tối',
  'đa', 'tối', 'thiểu', 'trung', 'bình', 'cao', 'thấp', 'lớn', 'bé', 'dài',
  'ngắn', 'rộng', 'hẹp', 'nặng', 'nhẹ', 'nhanh', 'chậm', 'mạnh', 'yếu',
  'sắc', 'nét', 'mờ', 'nhạt', 'đậm', 'nhạt', 'sáng', 'tối', 'ấm', 'áp',
  'lạnh', 'giá', 'mát', 'mẻ', 'nóng', 'bức', 'khô', 'ráo', 'ẩm', 'ướt',
  'sạch', 'sẽ', 'bẩn', 'thỉu', 'đẹp', 'xấu', 'tốt', 'tồi', 'quan', 'trọng',
  'cần', 'thiết', 'phức', 'tạp', 'đơn', 'giản', 'dễ', 'khó', 'sướng', 'khổ'
]);

/**
 * Tách từ đơn giản từ text
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\wÀ-ỹ\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1);
}

/**
 * Extract top keywords từ danh sách texts
 */
export function extractTopKeywords(texts, topN = 5) {
  const wordCount = new Map();

  texts.forEach(text => {
    const words = tokenize(text);
    words.forEach(word => {
      if (!STOP_WORDS.has(word)) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    });
  });

  const sorted = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);

  return sorted;
}
