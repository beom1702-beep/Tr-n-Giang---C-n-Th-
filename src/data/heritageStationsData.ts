export interface HeritageStation {
  id: string;
  stationCode: string;
  name: string;
  historicalPeriod: string;
  address: string;
  badge: string;
  summary: string;
  keyFeatures: string[];
  tasks: {
    id: string;
    taskTitle: string;
    instruction: string;
    inputType: 'text' | 'number' | 'select' | 'photo_upload';
    options?: string[];
    placeholder?: string;
    unit?: string;
    hint: string;
  }[];
  dataMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
  galleryImages: {
    title: string;
    subtitle: string;
    url: string;
    description: string;
    isPrimary?: boolean;
  }[];
  fieldworkNotice: string;
}

export const HERITAGE_STATIONS: HeritageStation[] = [
  {
    id: 'station-bao-tang',
    stationCode: 'NK-BT01',
    name: 'Bảo tàng Cần Thơ',
    historicalPeriod: 'Khởi dựng 1976 - Trưng bày Di sản Óc Eo & Lịch sử Cần Thơ',
    address: 'Số 1 Đại lộ Hòa Bình, phường Tân An, quận Ninh Kiều',
    badge: 'Di sản & Khảo cổ',
    summary: 'Bảo tàng Cần Thơ là bảo tàng tổng hợp có quy mô lớn nhất đồng bằng sông Cửu Long với diện tích gần 3.000m2, lưu giữ gần 10.000 hiện vật quý giá về văn hóa Óc Eo, kháng chiến cứu nước và đời sống cộng đồng 3 dân tộc Kinh - Hoa - Khmer.',
    keyFeatures: [
      'Bộ sưu tập hiện vật Văn hóa Óc Eo (khu di tích Nhơn Thành, Phong Điền)',
      'Không gian tái hiện sinh hoạt 3 dân tộc Kinh - Hoa - Khmer Tây Đô',
      'Tư liệu gốc về cuộc Tổng tiến công Mậu Thân 1968 và Lộ Vòng Cung',
      'Sa bàn địa hình chiến lược Cần Thơ qua các thời kỳ lịch sử'
    ],
    tasks: [
      {
        id: 'task-bt-1',
        taskTitle: 'Ghi chép hiện vật Óc Eo tiêu biểu',
        instruction: 'Quan sát khu trưng bày Óc Eo tại tầng 1 và ghi lại tên 01 hiện vật bằng gốm hoặc vàng lá mà nhóm em ấn tượng nhất kèm niên đại ước tính.',
        inputType: 'text',
        placeholder: 'Ví dụ: Tượng Phật bằng gỗ thế kỷ V hoặc Vòng tay thủy tinh Óc Eo...',
        hint: 'Khu di tích Nhơn Thành (Cần Thơ) là một trong những trung tâm khảo cổ Óc Eo lớn nhất được bảo tàng bảo tồn.'
      },
      {
        id: 'task-bt-2',
        taskTitle: 'Số lượng dân tộc anh em cùng chung sống',
        instruction: 'Khu vực trưng bày dân tộc học thể hiện sự đoàn kết gắn bó của bao nhiêu dân tộc anh em truyền thống tại Cần Thơ?',
        inputType: 'select',
        options: ['2 dân tộc (Kinh - Hoa)', '3 dân tộc (Kinh - Hoa - Khmer)', '4 dân tộc (Kinh - Hoa - Khmer - Chăm)', '5 dân tộc'],
        hint: 'Cần Thơ là nơi hội tụ tinh hoa văn hóa truyền thống của 3 dân tộc Kinh, Hoa và Khmer.'
      },
      {
        id: 'task-bt-3',
        taskTitle: 'Ảnh minh chứng khảo sát bảo tàng',
        instruction: 'Đính kèm ảnh chụp nhóm trước tiền sảnh số 1 Hòa Bình hoặc góc hiện vật em nghiên cứu.',
        inputType: 'photo_upload',
        hint: 'Tải lên ảnh khảo sát thực tế hoặc bấm nút chụp ảnh giả lập từ camera thực nghiệm.'
      }
    ],
    dataMetrics: [
      { label: 'Diện tích trưng bày', value: '2.700 m²', description: 'Bảo tàng tổng hợp lớn nhất vùng Tây Nam Bộ' },
      { label: 'Số hiện vật lưu giữ', value: '> 10.000', description: 'Hiện vật quý giá từ khảo cổ học đến cận hiện đại' },
      { label: 'Lượt khách/học sinh', value: '45.000 / năm', description: 'Điểm đến trọng tâm của môn GDĐP Cần Thơ' }
    ],
    galleryImages: [
      {
        title: 'Mặt tiền Bảo tàng Cần Thơ',
        subtitle: 'Số 1 Đại lộ Hòa Bình, P. Tân An, Q. Ninh Kiều',
        url: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
        description: 'Tòa nhà bề thế xây dựng theo phong cách kiến trúc hiện đại kết hợp mái ngói truyền thống, lưu giữ gần 10.000 hiện vật quý giá của Cần Thơ.',
        isPrimary: true
      },
      {
        title: 'Không gian Văn hóa Óc Eo (Nhơn Thành)',
        subtitle: 'Khai quật khảo cổ thế kỷ I - VII SCN',
        url: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
        description: 'Bộ sưu tập tượng Phật gỗ cổ, khuôn đúc vàng lá, vòng tay thủy tinh và đồ gốm chứng minh thương cảng sầm uất thời tiền sử Cần Thơ.'
      },
      {
        title: 'Sinh hoạt 3 dân tộc Kinh - Hoa - Khmer',
        subtitle: 'Khối đoàn kết cư dân Tây Đô',
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
        description: 'Tái hiện trang phục, nông cụ, nhạc cụ và lễ hội truyền thống Ok Om Bok, Chôl Chnăm Thmây của đồng bào miền Tây sông nước.'
      }
    ],
    fieldworkNotice: 'Học sinh chú ý giữ trật tự, tuyệt đối không chạm tay vào các tủ kính trưng bày cổ vật Óc Eo.'
  },
  {
    id: 'station-cho-co',
    stationCode: 'NK-CC02',
    name: 'Nhà lồng Chợ cổ Cần Thơ',
    historicalPeriod: 'Xây dựng năm 1915 - Thời kỳ Pháp thuộc',
    address: 'Đường Hai Bà Trưng, bến Ninh Kiều, quận Ninh Kiều',
    badge: 'Kiến trúc Đô thị',
    summary: 'Chợ cổ Cần Thơ (còn gọi là Chợ Lục tỉnh hoặc Chợ Hàng Dương) được xây dựng cùng thời kỳ với chợ Bến Thành (Sài Gòn) vào năm 1915. Đây là công trình mang nét kiến trúc vòm nóc mái ngói âm dương pha trộn kỹ thuật sắt Pháp độc đáo.',
    keyFeatures: [
      'Kiến trúc mái vòm cong cổ kính đón gió mát từ sông Cần Thơ',
      'Vị trí chiến lược: "Trên bến dưới thuyền" sầm uất cả một thế kỷ',
      'Không gian làng nghề lưu niệm và đặc sản ẩm thực miền Tây',
      'Trụ đá và dầm sắt đinh tán nguyên bản từ năm 1915'
    ],
    tasks: [
      {
        id: 'task-cc-1',
        taskTitle: 'Khảo sát dấu ấn năm xây dựng',
        instruction: 'Xác định năm khánh thành chợ cổ Cần Thơ ghi trên biển vòm mặt tiền đối diện sông Cần Thơ.',
        inputType: 'number',
        placeholder: '1915',
        unit: 'năm',
        hint: 'Được người Pháp khởi công xây dựng từ những năm đầu thế kỷ 20, hoàn thành năm 1915.'
      },
      {
        id: 'task-cc-2',
        taskTitle: 'Đặc điểm giao thương "Trên bến dưới thuyền"',
        instruction: 'Quan sát bờ kè ngay trước chợ cổ và mô tả cách thức ghe thương hồ neo đậu vận chuyển hàng hóa xưa và nay.',
        inputType: 'text',
        placeholder: 'Ghi lại nhận xét về sự thay đổi phương thức vận chuyển đường thủy sang đường bộ...',
        hint: 'Xưa kia ghe xuồng từ khắp Cái Răng, Phong Điền, Thốt Nốt chở trái cây dập dìu cập bến cầu tàu.'
      },
      {
        id: 'task-cc-3',
        taskTitle: 'Ảnh minh chứng chi tiết kiến trúc',
        instruction: 'Chụp hoặc tải ảnh chụp mái vòm chợ hoặc hàng cột vòm thời Pháp.',
        inputType: 'photo_upload',
        hint: 'Chọn góc chụp làm nổi bật nét cổ kính của nhà lồng chợ cổ hơn 110 năm tuổi.'
      }
    ],
    dataMetrics: [
      { label: 'Năm xây dựng', value: '1915', description: 'Tròn hơn 110 năm tuổi lịch sử đô thị Tây Đô' },
      { label: 'Cấu trúc mái vòm', value: 'Ngói cổ & Thép', description: 'Giao thoa kiến trúc Đông Dương (Indochine)' },
      { label: 'Khoảng cách ra sông', value: '25 m', description: 'Tiếp giáp trực tiếp thủy lộ sông Cần Thơ' }
    ],
    galleryImages: [
      {
        title: 'Nhà lồng Chợ Cổ Cần Thơ (1915)',
        subtitle: 'Đường Hai Bà Trưng, Bến Ninh Kiều',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        description: 'Công trình kiến trúc thế kỷ XX được mệnh danh là ngôi chợ đẹp nhất xứ Lục tỉnh Nam Kỳ, xây dựng cùng thời với Chợ Bến Thành.',
        isPrimary: true
      },
      {
        title: 'Mái vòm ngói cổ giao thoa kiến trúc Pháp',
        subtitle: 'Hệ vì kèo sắt và vòm trần đón gió sông',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        description: 'Kết cấu thép đinh tán nhập khẩu từ Pháp kết hợp ngói âm dương đón gió mát lồng lộng từ dòng sông Cần Thơ thổi vào.'
      },
      {
        title: 'Thương cảng "Trên bến dưới thuyền"',
        subtitle: 'Nơi cập bến của ghe lườn, chẹt miệt vườn',
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
        description: 'Cầu tàu trước chợ là nơi hàng vạn tấn nông sản, trái cây, bánh tráng tỏa đi khắp vùng Nam Kỳ lục tỉnh.'
      }
    ],
    fieldworkNotice: 'Khu vực chợ cổ có mật độ du khách qua lại cao, chú ý an toàn tư trang và phương tiện giao thông.'
  },
  {
    id: 'station-do-thi-moi-truong',
    stationCode: 'NK-MT03',
    name: 'Khảo sát Đô thị & Môi trường Ninh Kiều',
    historicalPeriod: 'Hiện trạng Đô thị hóa & Biến đổi khí hậu thế kỷ XXI',
    address: 'Khu vực Công viên Bến Ninh Kiều & Trục đường ven sông Hậu',
    badge: 'Sinh thái & Địa lý 4.0',
    summary: 'Quận Ninh Kiều là trung tâm kinh tế - giáo dục của TP Cần Thơ nhưng đang đối mặt với bài toán đô thị gay gắt: mật độ dân số cao kỷ lục 10.005 người/km², hiện tượng triều cường sông Hậu dâng cao vào tháng 9-10 âm lịch và công tác phân loại rác thải bảo vệ nguồn nước.',
    keyFeatures: [
      'Mật độ dân số cực cao: 10.005 người/km² (gấp gần 10 lần mức bình quân ĐBSCL)',
      'Hiện tượng triều cường Rằm tháng 9 & tháng 10 ngập các tuyến đường ven sông',
      'Hệ thống công viên bờ sông Hậu - "Lá phổi xanh" điều hòa khí hậu đô thị',
      'Kênh thoát nước tự nhiên và kè chống sạt lở Ninh Kiều hiện đại'
    ],
    tasks: [
      {
        id: 'task-mt-1',
        taskTitle: 'Đo đạc mực nước / Triều cường mô phỏng',
        instruction: 'Nhập số liệu đỉnh triều cường đo được tại trạm quan trắc trạm Bến Ninh Kiều (hoặc dữ liệu quan trắc thực địa tháng 9-10 âm lịch).',
        inputType: 'number',
        placeholder: 'Ví dụ: 2.15',
        unit: 'mét (+H)',
        hint: 'Đỉnh triều lịch sử tại trạm Cần Thơ từng chạm mức kỷ lục +2.27m gây ngập đường Cách Mạng Tháng Tám và Hải Thượng Lãn Ông.'
      },
      {
        id: 'task-mt-2',
        taskTitle: 'Thực trạng phân loại rác thải đô thị',
        instruction: 'Đánh giá mức độ người dân và du khách phân loại rác tại nguồn ở khu vực phố đi bộ bến Ninh Kiều.',
        inputType: 'select',
        options: [
          'Tốt: Phân chia rõ ràng rác hữu cơ và rác tái chế',
          'Khá: Thùng rác phân loại có sẵn nhưng còn bỏ lẫn lộn',
          'Trung bình: Người dân còn thói quen vứt rác chung một túi',
          'Cần cải thiện: Thiếu thùng rác phân loại chuyên biệt ven bờ sông'
        ],
        hint: 'Quan sát các thùng rác hai ngăn (hữu cơ - tái chế) dọc tuyến công viên Ninh Kiều.'
      },
      {
        id: 'task-mt-3',
        taskTitle: 'Đề xuất giải pháp xanh cho Ninh Kiều',
        instruction: 'Gợi ý 01 giải pháp thiết thực từ góc nhìn học sinh THCS để giảm tải rác thải hoặc hạn chế rác trôi dạt ra sông Hậu.',
        inputType: 'text',
        placeholder: 'Ví dụ: Lắp lưới chắn rác tại các miệng cống thoát ra sông Hậu...',
        hint: 'Gợi ý: Giáo dục học đường, lưới chắn rác cống ngầm, ngày chủ nhật xanh làm sạch bờ kè.'
      }
    ],
    dataMetrics: [
      { label: 'Mật độ dân số', value: '10.005 người/km²', description: 'Mật độ dân số cao nhất vùng ĐBSCL' },
      { label: 'Mực nước đỉnh triều', value: '+2.15 m - +2.27 m', description: 'Tác động mạnh vào kỳ triều cường rằm tháng 9-10 AL' },
      { label: 'Chiều dài kè sông Hậu', value: '> 5.8 km', description: 'Tuyến kè kiên cố kết hợp công viên sinh thái' }
    ],
    galleryImages: [
      {
        title: 'Bến Ninh Kiều & Tượng đài Bác Hồ',
        subtitle: 'Biểu tượng lịch sử và văn hóa Tây Đô',
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
        description: 'Tượng đài Chủ tịch Hồ Chí Minh bằng đồng cao 7.2m sừng sững bên ngã ba sông Hậu và sông Cần Thơ.',
        isPrimary: true
      },
      {
        title: 'Cầu Đi Bộ Ninh Kiều (Cầu Tình Yêu)',
        subtitle: 'Kiến trúc hình đóa sen cách điệu hiện đại',
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        description: 'Cầu đi bộ dài gần 200m nối Bến Ninh Kiều sang Cồn Cái Khế, điểm ngắm toàn cảnh triều cường sông Hậu lộng gió.'
      },
      {
        title: 'Tuyến bờ kè chống ngập & Công viên sông Hậu',
        subtitle: 'Lá phổi xanh và phòng tuyến ứng phó triều cường',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        description: 'Kè bê tông kiên cố kết hợp van ngăn triều tự động nhằm giảm thiểu ngập lụt nội ô quận Ninh Kiều mùa lũ.'
      }
    ],
    fieldworkNotice: 'Khi tiến hành khảo sát mực nước ven bờ sông, học sinh bắt buộc đứng sau lan can bảo vệ của kè đá.'
  }
];
