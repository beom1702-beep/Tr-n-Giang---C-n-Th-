export interface HistoricalEra {
  id: string;
  year: number;
  yearLabel: string;
  name: string;
  subtitle: string;
  location: string;
  coordinates: { x: number; y: number; z: number };
  badge: string;
  sgkReference: string;
  gradeLevel: 'Khối 8' | 'Khối 9' | 'Khối 8 & 9';
  summary: string;
  historicalContext: string;
  keyArtifacts: string[];
  fieldworkPrompt: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'tran-giang-1739',
    year: 1739,
    yearLabel: 'Năm 1739',
    name: 'Đạo Trấn Giang',
    subtitle: 'Mạc Thiên Tích khai lập tiền thân xứ Tây Đô',
    location: 'Bến ngã ba sông Hậu & rạch Cần Thơ',
    coordinates: { x: -8, y: 0.6, z: 6 },
    badge: 'Mốc mở cõi',
    sgkReference: 'Lịch sử & Địa phương Cần Thơ - Lớp 8 (Chủ đề 2: Khai hoang lập làng)',
    gradeLevel: 'Khối 8',
    summary: 'Năm Kỷ Mùi (1739), Mạc Thiên Tích (Đô đốc trấn Hà Tiên, con trai Mạc Cửu) sáp nhập vùng đất Cần Thơ vào lãnh phận Hà Tiên và lập ra Đạo Trấn Giang, đặt đại bản doanh đồn trú ven sông.',
    historicalContext: 'Đạo Trấn Giang giữ vị thế tiền tiêu chiến lược kiểm soát thủy lộ sông Hậu và mạng lưới kênh rạch Tây Nam Bộ. Với sự bảo hộ của quân Mạc, cư dân các vùng Ngũ Quảng, Tiền Giang xuôi dòng đến đây mở đất trồng lúa, bắt cá, lập nên các thương điếm sầm uất ven bờ sông Hậu.',
    keyArtifacts: ['Bản đồ sông rạch Trấn Giang triều Nguyễn', 'Lệnh bài tướng quân Họ Mạc', 'Gươm đồng và gốm cổ khai quật bờ sông Cần Thơ'],
    fieldworkPrompt: 'Tìm hiểu vị trí ranh giới Đạo Trấn Giang xưa tương ứng với những phường nào thuộc quận Ninh Kiều và Cái Răng ngày nay.',
    quizQuestion: {
      question: 'Ai là người có công thành lập Đạo Trấn Giang vào năm 1739?',
      options: ['Mạc Cửu', 'Mạc Thiên Tích', 'Bùi Hữu Nghĩa', 'Châu Văn Liêm'],
      correctIndex: 1,
      explanation: 'Năm 1739, Đô đốc Mạc Thiên Tích lập Đạo Trấn Giang để bảo vệ bờ cõi và phát triển giao thương sông nước Cần Thơ.'
    }
  },
  {
    id: 'hat-can-tho-1876',
    year: 1876,
    yearLabel: 'Năm 1876',
    name: 'Hạt Cần Thơ',
    subtitle: 'Thời kỳ quy hoạch đô thị và Bến thương cảng Ninh Kiều',
    location: 'Dọc bến sông Hậu (Bến Ninh Kiều ngày nay)',
    coordinates: { x: 2, y: 0.7, z: -2 },
    badge: 'Đô thị hóa',
    sgkReference: 'Giáo dục địa phương Cần Thơ - Lớp 8 & 9 (Chủ đề: Đô thị hóa Tây Đô)',
    gradeLevel: 'Khối 8 & 9',
    summary: 'Năm 1876, thực dân Pháp chia Nam Kỳ thành các Hạt thanh tra hành chính, chính thức thành lập Hạt Cần Thơ (sau đổi thành tỉnh Cần Thơ năm 1899), bắt đầu quy hoạch phố thị.',
    historicalContext: 'Chính quyền thuộc địa quy hoạch trục đại lộ Hòa Bình, Bến thương cảng ven sông (Le quai de Commerce - tiền thân Bến Ninh Kiều) và khu Nhà lồng chợ cổ (1915). Cần Thơ nhanh chóng trở thành trung tâm xay xát lúa gạo và trung tâm văn hóa giáo dục lớn nhất miền Tây Nam Kỳ.',
    keyArtifacts: ['Bản đồ quy hoạch Hạt Cần Thơ 1876', 'Ảnh tư liệu Bến Thương Cảng 1900', 'Mô hình Nhà lồng chợ cổ 1915'],
    fieldworkPrompt: 'Quan sát các khối nhà kiến trúc Pháp còn sót lại xung quanh Đại lộ Hòa Bình và khu vực tượng đài Bác Hồ bến Ninh Kiều.',
    quizQuestion: {
      question: 'Bến Ninh Kiều thời kỳ Hạt Cần Thơ (cuối thế kỷ XIX) có tên gọi ban đầu là gì?',
      options: ['Bến Cây Me', 'Bến Thương Cảng (Quai de Commerce)', 'Bến Ninh Kiều', 'Bến Trấn Giang'],
      correctIndex: 1,
      explanation: 'Thời Pháp thuộc, bến được gọi là Bến Thương Cảng (Quai de Commerce) do tàu buôn lúa gạo cập bến tấp nập, đến năm 1957 mới chính thức đổi tên thành Bến Ninh Kiều.'
    }
  },
  {
    id: 'co-do-1929',
    year: 1929,
    yearLabel: 'Năm 1929',
    name: 'Chi bộ Cờ Đỏ',
    subtitle: 'Chi bộ Cộng sản đầu tiên thắp sáng ngọn lửa cách mạng Cần Thơ',
    location: 'Ấp Thới Hòa, đồn điền Cờ Đỏ (huyện Cờ Đỏ ngày nay)',
    coordinates: { x: -14, y: 0.5, z: -10 },
    badge: 'Mốc son Cách mạng',
    sgkReference: 'Lịch sử Cần Thơ - Lớp 9 (Chủ đề 3: Phong trào cách mạng 1930 - 1945)',
    gradeLevel: 'Khối 9',
    summary: 'Tháng 11/1929, tại đồn điền Cờ Đỏ, đồng chí Hà Huy Giáp thay mặt tổ chức đã thành lập Chi bộ An Nam Cộng sản Đảng đầu tiên ở Cần Thơ, tiền thân của Đảng bộ TP Cần Thơ.',
    historicalContext: 'Đồn điền Cờ Đỏ lúc bấy giờ là nơi tập trung hàng ngàn tá điền bị địa chủ bóc lột cùng cực. Sự ra đời của Chi bộ Cờ Đỏ đã lãnh đạo phong trào đấu tranh đòi giảm tô, giảm tức, mở đầu cho cao trào cách mạng 1930-1931 tại miền Tây Nam Bộ.',
    keyArtifacts: ['Truyền đơn cách mạng in trên bản đá', 'Ngọn đèn dầu bí mật họp chi bộ', 'Bia kỷ niệm di tích lịch sử đồn điền Cờ Đỏ'],
    fieldworkPrompt: 'Phân tích vì sao Cờ Đỏ được chọn làm nơi thành lập chi bộ đảng đầu tiên thay vì nội ô thành phố Cần Thơ.',
    quizQuestion: {
      question: 'Chi bộ An Nam Cộng sản Đảng đầu tiên tại Cần Thơ được thành lập vào thời gian nào?',
      options: ['Tháng 2/1930', 'Tháng 11/1929', 'Tháng 8/1945', 'Tháng 1/1968'],
      correctIndex: 1,
      explanation: 'Tháng 11/1929, Chi bộ Cờ Đỏ được thành lập, đánh dấu bước ngoặt lãnh đạo phong trào công - nông Cần Thơ.'
    }
  },
  {
    id: 'lo-vong-cung-1968',
    year: 1968,
    yearLabel: 'Năm 1968',
    name: 'Tuyến lửa Lộ Vòng Cung',
    subtitle: 'Vành đai lửa kiên cường trong Tổng tiến công Mậu Thân',
    location: 'Tuyến đường vòng cung qua An Bình, Mỹ Khánh, Phong Điền',
    coordinates: { x: 8, y: 0.8, z: 8 },
    badge: 'Trận tuyến anh hùng',
    sgkReference: 'Lịch sử & GDĐP Cần Thơ - Lớp 9 (Chủ đề: Cuộc kháng chiến chống Mỹ)',
    gradeLevel: 'Khối 9',
    summary: 'Lộ Vòng Cung dài gần 30km uốn quanh Tây Đô là cửa ngõ yết hầu quân sự, nơi diễn ra cuộc đọ sức sinh tử khốc liệt trong cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968.',
    historicalContext: 'Được mệnh danh là "Vành đai lửa", nơi quân dân Cần Thơ kiên cường bám trụ dưới mưa bom bão đạn (ước tính hàng triệu quả pháo và bom rải xuống). Tinh thần "Đi không dấu, nấu không khói, nói không tiếng" cùng hệ thống hầm bí mật trong vườn cây ăn trái đã chở che các trung đoàn giải phóng.',
    keyArtifacts: ['Vỏ bom rùa và xác trực thăng chiến đấu', 'Địa đạo và hầm bí mật Lộ Vòng Cung', 'Gậy tầm vông và bi-đông nước của quân giải phóng'],
    fieldworkPrompt: 'Tìm hiểu câu ca dao truyền miệng của nhân dân: "Vòng Cung đi dễ khó về / Đạn chen đầu súng, bom kề bên tai" để cảm nhận sự hy sinh của thế hệ cha anh.',
    quizQuestion: {
      question: 'Tuyến lửa Lộ Vòng Cung Cần Thơ đi qua các địa bàn trọng điểm nào?',
      options: [
        'An Bình, Mỹ Khánh, Phong Điền',
        'Thốt Nốt, Thới Lai, Cờ Đỏ',
        'Vĩnh Thạnh, Ô Môn, Bình Thủy',
        'Cái Răng, Trà Nóc, Tân Lộc'
      ],
      correctIndex: 0,
      explanation: 'Lộ Vòng Cung dài gần 30km chạy qua An Bình, Mỹ Khánh, Giai Xuân, Phong Điền... hình thành vòng cung khép chặt bảo vệ căn cứ cách mạng.'
    }
  }
];
