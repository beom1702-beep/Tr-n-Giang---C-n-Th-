export interface RubricCriterion {
  id: string;
  name: string;
  maxScore: number;
  weightLabel: string;
  description: string;
  levels: {
    scoreRange: string;
    levelName: string;
    indicators: string[];
  }[];
}

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'kien-thuc-can-tho',
    name: 'Kiến thức Lịch sử & Văn hóa Cần Thơ',
    maxScore: 3.0,
    weightLabel: '3.0 điểm (30%)',
    description: 'Độ chuẩn xác, sâu sắc về các mốc lịch sử (Đạo Trấn Giang 1739, Hạt Cần Thơ 1876, Chi bộ Cờ Đỏ 1929, Lộ Vòng Cung 1968), địa danh, nhân vật lịch sử (Mạc Thiên Tích, Bùi Hữu Nghĩa, Hà Huy Giáp...) và làng nghề truyền thống.',
    levels: [
      {
        scoreRange: '2.5 - 3.0 điểm',
        levelName: 'Xuất sắc',
        indicators: [
          'Tái hiện chính xác các mốc thời gian, tên nhân vật và sự kiện lịch sử Cần Thơ.',
          'Hiểu rõ bối cảnh hình thành và ý nghĩa chiến lược của địa bàn.',
          'Kết nối nhuần nhuyễn kiến thức SGK GDĐP với không gian thực tế.'
        ]
      },
      {
        scoreRange: '1.8 - 2.4 điểm',
        levelName: 'Đạt yêu cầu',
        indicators: [
          'Nêu được các sự kiện cơ bản nhưng còn thiếu chi tiết phân tích sâu.',
          'Đôi chỗ còn nhầm lẫn nhỏ về mốc năm hoặc vai trò nhân vật lịch sử.'
        ]
      },
      {
        scoreRange: '0 - 1.7 điểm',
        levelName: 'Cần khắc phục',
        indicators: [
          'Kiến thức chung chung, sao chép máy móc, thiếu dẫn chứng về Cần Thơ.',
          'Sai sót nhiều về mốc thời gian hoặc địa danh địa phương.'
        ]
      }
    ]
  },
  {
    id: 'chat-lieu-thuc-te',
    name: 'Chất liệu Điền dã & Thực tế',
    maxScore: 3.0,
    weightLabel: '3.0 điểm (30%)',
    description: 'Dẫn chứng cụ thể thu thập từ chuyến điền dã thực địa tại các trạm Ninh Kiều (Bảo tàng Cần Thơ, Chợ Cổ 1915, khảo sát triều cường/môi trường), lời phỏng vấn nghệ nhân Bác Ba Lập, số liệu đo đạc trực tiếp.',
    levels: [
      {
        scoreRange: '2.5 - 3.0 điểm',
        levelName: 'Xuất sắc',
        indicators: [
          'Có số liệu thực tế sống động (mật độ dân số 10.005 người/km², mực nước triều cường, kích thước liếp phơi tre...).',
          'Trích dẫn chân thực cảm xúc hoặc lời dặn của nghệ nhân làng nghề.',
          'Có hình ảnh hoặc bản ghi chép hiện trường tự quan sát.'
        ]
      },
      {
        scoreRange: '1.8 - 2.4 điểm',
        levelName: 'Đạt yêu cầu',
        indicators: [
          'Có nhắc đến địa điểm khảo sát nhưng chưa đưa ra được số liệu hay hiện vật cụ thể.',
          'Chưa bộc lộ rõ dấu ấn trải nghiệm cá nhân tại hiện trường.'
        ]
      },
      {
        scoreRange: '0 - 1.7 điểm',
        levelName: 'Cần khắc phục',
        indicators: [
          'Không có dẫn chứng thực tế, chỉ viết lý thuyết suông từ internet.',
          'Thiếu vắng hoàn toàn trải nghiệm khảo sát thực địa.'
        ]
      }
    ]
  },
  {
    id: 'cau-truc-chinh-ta',
    name: 'Cấu trúc & Chuẩn Chính tả Tiếng Việt',
    maxScore: 2.0,
    weightLabel: '2.0 điểm (20%)',
    description: 'Bố cục bài viết mạch lạc (Mở - Thân - Kết), sử dụng từ ngữ trong sáng, không bị lỗi chính tả âm thanh phương ngữ Nam Bộ (t/c, n/ng, hỏi/ngã, v/d) khi viết văn bản học thuật.',
    levels: [
      {
        scoreRange: '1.7 - 2.0 điểm',
        levelName: 'Xuất sắc',
        indicators: [
          'Bố cục 3 phần chặt chẽ, luận điểm rõ ràng, hành văn trôi chảy.',
          'Phân biệt chuẩn xác giữa khẩu ngữ phương ngữ (khi đặt trong ngoặc kép trích dẫn) và văn phong học đường.',
          'Không mắc lỗi chính tả âm hưởng Nam Bộ.'
        ]
      },
      {
        scoreRange: '1.2 - 1.6 điểm',
        levelName: 'Đạt yêu cầu',
        indicators: [
          'Bố cục khá rõ nhưng liên kết giữa các đoạn chưa thật mượt mà.',
          'Còn sót 1-2 lỗi chính tả phương ngữ (như nhầm dấu hỏi ngã hoặc âm đuôi t/c).'
        ]
      },
      {
        scoreRange: '0 - 1.1 điểm',
        levelName: 'Cần khắc phục',
        indicators: [
          'Bố cục lộn xộn, thiếu đoạn kết bài hoặc mở bài cụt lủn.',
          'Sai chính tả nhiều nơi, phát âm sao viết vậy thiếu sự trau chuốt.'
        ]
      }
    ]
  },
  {
    id: 'sang-tao-giai-phap',
    name: 'Giải pháp Vận dụng Sáng tạo',
    maxScore: 2.0,
    weightLabel: '2.0 điểm (20%)',
    description: 'Ý tưởng đề xuất của học sinh THCS nhằm gìn giữ di sản Cần Thơ, quảng bá văn hóa Tây Đô hoặc giải pháp thiết thực bảo vệ môi trường, ứng phó triều cường tại quận Ninh Kiều.',
    levels: [
      {
        scoreRange: '1.7 - 2.0 điểm',
        levelName: 'Xuất sắc',
        indicators: [
          'Đề xuất giải pháp mới mẻ, mang tính khả thi cao đối với lứa tuổi THCS (làm video số, dự án xanh trường học, tour học tập...).',
          'Thể hiện tình yêu quê hương Cần Thơ sâu sắc và trách nhiệm công dân trẻ tuổi.'
        ]
      },
      {
        scoreRange: '1.2 - 1.6 điểm',
        levelName: 'Đạt yêu cầu',
        indicators: [
          'Có nêu giải pháp nhưng còn chung chung (ví dụ chỉ kêu gọi "hãy bảo vệ môi trường").',
          'Ý thức giữ gìn di sản tốt nhưng chưa gắn với hành động cụ thể.'
        ]
      },
      {
        scoreRange: '0 - 1.1 điểm',
        levelName: 'Cần khắc phục',
        indicators: [
          'Không có phần đề xuất giải pháp hoặc chỉ sao chép một câu sáo rỗng.',
          'Chưa thể hiện được góc nhìn riêng của bản thân.'
        ]
      }
    ]
  }
];

export interface EvaluationReport {
  score1: number; // /3.0
  score2: number; // /3.0
  score3: number; // /2.0
  score4: number; // /2.0
  totalScore: number; // /10.0
  gradeCategory: 'Xuất sắc (Giỏi)' | 'Khá' | 'Trung bình' | 'Cần rèn luyện thêm';
  feedbackCriteria: {
    criterionId: string;
    score: number;
    maxScore: number;
    pros: string[];
    improvements: string[];
  }[];
  generalAssessment: string;
  bacBaLapAdvice: string;
  nextStepRecommendations: string[];
  draftComparisonHighlights?: {
    wordCountDiff: number;
    vocabularyImprovement: string;
    structureUpgrade: string;
  };
}

export function calculateLocalRubric(draft1: string, draft2: string): EvaluationReport {
  const text = (draft2 && draft2.trim().length > 30) ? draft2 : draft1;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();

  // Criterion 1: Kiến thức Cần Thơ (max 3.0)
  let s1 = 1.2;
  const hasHistory = ['trấn giang', '1739', 'hạt cần thơ', '1876', 'cờ đỏ', '1929', 'lộ vòng cung', '1968'].filter(w => lower.includes(w)).length;
  const hasCulture = ['thuận hưng', 'bánh tráng', 'thới long', 'đan lọp', 'đờn ca tài tử', 'ninh kiều', 'mạc thiên tích'].filter(w => lower.includes(w)).length;
  s1 += Math.min(hasHistory * 0.4 + hasCulture * 0.3, 1.8);
  s1 = Math.min(Math.round(s1 * 10) / 10, 3.0);

  // Criterion 2: Chất liệu thực tế (max 3.0)
  let s2 = 1.0;
  const hasRealData = ['bảo tàng', 'chợ cổ', '1915', '10.005', 'triều cường', 'mực nước', 'khảo sát', 'thực tế', 'bác ba'].filter(w => lower.includes(w)).length;
  s2 += Math.min(hasRealData * 0.45, 2.0);
  s2 = Math.min(Math.round(s2 * 10) / 10, 3.0);

  // Criterion 3: Cấu trúc & chuẩn chính tả (max 2.0)
  let s3 = 1.0;
  if (wordCount >= 120) s3 += 0.5;
  if (wordCount >= 200) s3 += 0.3;
  // Penalty for dialect spelling mistakes
  const spellMistakes = ['cá lót', 'hột míc', 'nghỉ ngợi', 'dui dẻ', 'nguy hỉm', 'nước rồng'].filter(w => lower.includes(w)).length;
  s3 = Math.max(0.5, s3 - spellMistakes * 0.3);
  s3 = Math.min(Math.round(s3 * 10) / 10, 2.0);

  // Criterion 4: Giải pháp vận dụng sáng tạo (max 2.0)
  let s4 = 0.8;
  const hasSolutions = ['giải pháp', 'đề xuất', 'em nghĩ', 'học sinh chúng em', 'bảo vệ', 'tuyên truyền', 'dự án', 'lan tỏa'].filter(w => lower.includes(w)).length;
  s4 += Math.min(hasSolutions * 0.4, 1.2);
  s4 = Math.min(Math.round(s4 * 10) / 10, 2.0);

  const total = Math.round((s1 + s2 + s3 + s4) * 10) / 10;
  let gradeCategory: EvaluationReport['gradeCategory'] = 'Trung bình';
  if (total >= 8.5) gradeCategory = 'Xuất sắc (Giỏi)';
  else if (total >= 7.0) gradeCategory = 'Khá';
  else if (total >= 5.0) gradeCategory = 'Trung bình';
  else gradeCategory = 'Cần rèn luyện thêm';

  const w1 = draft1.split(/\s+/).filter(Boolean).length;
  const w2 = draft2.split(/\s+/).filter(Boolean).length;

  return {
    score1: s1,
    score2: s2,
    score3: s3,
    score4: s4,
    totalScore: total,
    gradeCategory,
    feedbackCriteria: [
      {
        criterionId: 'kien-thuc-can-tho',
        score: s1,
        maxScore: 3.0,
        pros: s1 >= 2.2 ? ['Nắm chắc các địa danh và dòng thời gian lịch sử Tây Đô', 'Có sự đối chiếu giữa xưa và nay'] : ['Đã nêu được một số địa danh quen thuộc của thành phố'],
        improvements: s1 < 2.5 ? ['Nên bổ sung mốc thời gian cụ thể (như Đạo Trấn Giang 1739 hoặc Nhà lồng chợ cổ 1915)', 'Gắn kết tên các bậc tiền nhân có công mở cõi'] : ['Tiếp tục đào sâu thêm bối cảnh Lộ Vòng Cung 1968']
      },
      {
        criterionId: 'chat-lieu-thuc-te',
        score: s2,
        maxScore: 3.0,
        pros: s2 >= 2.2 ? ['Có số liệu và dẫn chứng sống động từ chuyến khảo sát trạm Ninh Kiều', 'Trích dẫn được tâm tình của nghệ nhân làng nghề'] : ['Đã đưa được cảm nghĩ cá nhân khi đi thực tế'],
        improvements: s2 < 2.5 ? ['Bổ sung số liệu thực tế đo đạc (như mật độ 10.005 người/km² hoặc mực nước triều cường)', 'Nhắc đến hiện vật cụ thể em quan sát ở Bảo tàng Cần Thơ'] : ['Nên đưa thêm ảnh chụp minh chứng hiện trường']
      },
      {
        criterionId: 'cau-truc-chinh-ta',
        score: s3,
        maxScore: 2.0,
        pros: s3 >= 1.6 ? ['Bố cục bài viết 3 phần rõ ràng', 'Không bị mắc lỗi chính tả phương ngữ khi trình bày văn bản'] : ['Lời văn tự nhiên, mộc mạc đúng chất học trò miền Tây'],
        improvements: s3 < 1.7 ? ['Kiểm tra lại các từ phát âm dễ lẫn lộn (dấu hỏi/ngã, âm đuôi t/c)', 'Thêm các từ liên kết đoạn văn để chuyển ý mượt mà hơn'] : ['Giữ vững văn phong học đường chuẩn mực']
      },
      {
        criterionId: 'sang-tao-giai-phap',
        score: s4,
        maxScore: 2.0,
        pros: s4 >= 1.5 ? ['Đưa ra ý tưởng hành động cụ thể, khả thi với lứa tuổi THCS', 'Bộc lộ niềm tự hào và tình yêu quê hương Cần Thơ'] : ['Có ý thức bảo vệ môi trường và gìn giữ di sản địa phương'],
        improvements: s4 < 1.6 ? ['Tránh viết lời kêu gọi chung chung, hãy nêu 1 việc làm nhỏ cụ thể (vd: dự án video giới thiệu bánh tráng Thuận Hưng cho trường em)', 'Đề xuất giải pháp phân loại rác tại nguồn ở Bến Ninh Kiều'] : ['Phát triển thêm mô hình lan tỏa đến các bạn cùng lớp']
      }
    ],
    generalAssessment: total >= 8.0
      ? 'Bài viết của em thể hiện năng lực tự nghiên cứu rất tốt, giàu chất liệu sông nước Tây Đô và có sự tiến bộ vượt bậc giữa các bản thảo!'
      : 'Bản thảo của em đã có nền tảng cảm xúc tốt. Em hãy đọc kỹ các gợi ý phân tích theo 4 tiêu chí để tự tay bổ sung số liệu và trau chuốt từ ngữ nghen!',
    bacBaLapAdvice: 'Bác Ba coi bài của cháu mà ưng cái bụng! Cháu nhớ nghen: bài thu hoạch hay nhất là bài do chính khối óc và bàn tay cháu viết nên từ những gì cháu tận mắt thấy, tai nghe bên dòng sông Hậu và lò bánh quê mình. Bác không viết giùm đâu, nhưng bác luôn đứng sau lưng ủng hộ cháu!',
    nextStepRecommendations: [
      'Bổ sung số liệu thực nghiệm: Mật độ dân số Ninh Kiều 10.005 người/km² hoặc kỹ thuật phơi bánh tráng trên liếp tre.',
      'Sử dụng bộ công cụ Dialect Spellchecker để rà soát chính tả một lượt trước khi nộp.',
      'So sánh điểm khác biệt giữa Bản thảo 1 và Bản hoàn thiện để thấy rõ sự trưởng thành trong cách hành văn.'
    ],
    draftComparisonHighlights: {
      wordCountDiff: w2 - w1,
      vocabularyImprovement: w2 > w1 ? 'Mở rộng vốn từ vựng học thuật và chi tiết miêu tả di sản sâu sắc hơn' : 'Bài viết cô đọng, súc tích hơn',
      structureUpgrade: 'Đã hoàn thiện liên kết giữa các luận điểm khảo sát và phần mở rộng giải pháp'
    }
  };
}
