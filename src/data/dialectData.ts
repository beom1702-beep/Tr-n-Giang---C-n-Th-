export interface DialectCard {
  id: string;
  word: string;
  phonetic: string;
  standardEquivalent: string;
  category: 'Địa hình sông nước' | 'Đời sống sinh hoạt' | 'Ẩm thực dân dã' | 'Cảm thán & Tính cách' | 'Dụng cụ truyền thống';
  definition: string;
  literaryContext: {
    source: string;
    author: string;
    quote: string;
    note: string;
  };
  exampleSentence: string;
  culturalNote: string;
  iconName: string;
}

export const DIALECT_CARDS: DialectCard[] = [
  {
    id: 'ca-rang',
    word: 'Cà ràng',
    phonetic: '/kaː˨˩ raːŋ˨˩/',
    standardEquivalent: 'Bếp lò nung bằng đất',
    category: 'Đời sống sinh hoạt',
    definition: 'Bếp đun nấu bằng đất nung có ba mỏm nhô lên giữ nồi, phần đáy kín để đựng than tro, được thiết kế đặc thù giữ thăng bằng an toàn khi nấu nướng trên ghe xuồng chòng chành.',
    literaryContext: {
      source: 'Văn minh miệt vườn',
      author: 'Nhà văn Sơn Nam',
      quote: 'Lửa cà ràng nhóm lên trên mũi ghe, tỏa mùi khói củi đước thơm nồng giữa một vùng lung trấp hoang sơ...',
      note: 'Nhà văn Sơn Nam khắc họa chiếc cà ràng như linh hồn giữ hơi ấm gia đình thương hồ suốt hành trình mở cõi miền Tây.'
    },
    exampleSentence: 'Má nhóm lửa cà ràng nấu nồi canh chua cá linh bông điên điển nghi ngút khói.',
    culturalNote: 'Gốc từ tiếng Khmer "Kran", là sự giao thoa văn hóa độc đáo giữa người Khmer và người Việt đồng bằng sông Cửu Long.',
    iconName: 'Flame'
  },
  {
    id: 'liep-phoi',
    word: 'Liếp phơi',
    phonetic: '/liəp˦˥ fɤːj˧˧/',
    standardEquivalent: 'Tấm vỉ tre phơi bánh/nông sản',
    category: 'Dụng cụ truyền thống',
    definition: 'Tấm vỉ đan bằng nan tre dài khoảng 2 mét, đan thưa vừa phải để đón nắng gió đều đặn, dùng phơi bánh tráng tại làng nghề Thuận Hưng hoặc phơi cá khô.',
    literaryContext: {
      source: 'Ghi chép Làng nghề Thuận Hưng - Thốt Nốt',
      author: 'Học liệu GDĐP Cần Thơ',
      quote: 'Sớm mai vừa hửng nắng, hàng trăm liếp phơi xếp đều tăm tắp bên bờ rạch Thơm Rơm như những dải lụa vàng óng ả...',
      note: 'Liếp phơi là hình ảnh biểu trưng cho sự cần lao, khéo léo của người thợ tráng bánh Tây Đô hơn hai thế kỷ qua.'
    },
    exampleSentence: 'Hai chú cháu bưng liếp phơi bánh tráng ra sân trước lúc mặt trời đứng bóng.',
    culturalNote: 'Mỗi liếp tre chứa được khoảng 5 đến 6 chiếc bánh tráng lớn, đòi hỏi kỹ thuật trở tay thật khéo để bánh không bị rách hay dính chặt nan tre.',
    iconName: 'Grid'
  },
  {
    id: 'lung-bung-trap',
    word: 'Lung - Bưng - Trấp',
    phonetic: '/luŋ˧˧ - ɓɨŋ˧˧ - ʈəp˦˥/',
    standardEquivalent: 'Các dạng đầm lầy, vũng trũng ngập nước',
    category: 'Địa hình sông nước',
    definition: 'Hệ thống định danh địa hình ngập nước Tây Nam Bộ: "Lung" là đầm nước trũng sâu quanh năm; "Bưng" là vùng đất trũng mọc nhiều cỏ năn, cỏ lác; "Trấp" là vũng nước đọng cạn trong rừng.',
    literaryContext: {
      source: 'Hương rừng Cà Mau & Đất Gia Định xưa',
      author: 'Sơn Nam',
      quote: 'Dưới lung thì cá lội ngập đăng, trên bưng thì lúa ma trổ bông theo con nước nổi...',
      note: 'Bộ ba từ chỉ địa hình này xuất hiện dày đặc trong địa danh Cần Thơ như Lung Cột Cầu, Bưng Đá, Trấp Lớn.'
    },
    exampleSentence: 'Mùa nước nổi này, đi xuồng qua mấy cái bưng lác tha hồ giăng lưới bắt cá rô mề.',
    culturalNote: 'Phản ánh tư duy phân loại sinh thái cực kỳ tinh tế của tổ tiên người phương Nam dựa trên độ sâu mặt nước và thảm thực vật.',
    iconName: 'Waves'
  },
  {
    id: 'bong-bup',
    word: 'Bông bụp',
    phonetic: '/ɓəwŋ˧˧ ɓup˨˩˨/',
    standardEquivalent: 'Hoa dâm bụt',
    category: 'Đời sống sinh hoạt',
    definition: 'Tên gọi thân thương của người Nam Bộ dành cho loài hoa dâm bụt đỏ rực thường trồng làm hàng rào quanh nhà tranh vách lá miệt vườn.',
    literaryContext: {
      source: 'Thơ Lục Châu Học',
      author: 'Thủ khoa Bùi Hữu Nghĩa (Cần Thơ)',
      quote: 'Hàng dâm bụt (bông bụp) thắm che bờ giậu / Gió thoảng đò ngang nhớ bóng xưa...',
      note: 'Nhà thơ Bùi Hữu Nghĩa - một trong rồng vàng Nam Bộ sinh ra tại làng Bình Thủy, Cần Thơ thường mượn cảnh sắc dung dị để gửi gắm khí tiết.'
    },
    exampleSentence: 'Con nít xóm vườn lấy cánh bông bụp ép vào tập học trò làm cánh bướm.',
    culturalNote: 'Người Nam Bộ kiêng phát âm từ có phụ âm gợi ý tế nhị nên nói chệch thành "bông bụp", tạo cảm giác gần gũi, đáng yêu.',
    iconName: 'Flower2'
  },
  {
    id: 'lop',
    word: 'Lọp',
    phonetic: '/lɔp˨˩˨/',
    standardEquivalent: 'Ngư cụ đan bằng tre bẫy cá tép',
    category: 'Dụng cụ truyền thống',
    definition: 'Dụng cụ đánh bắt hình ống dài có hom tre dẻo một chiều, đặt ngầm dưới rạch hay bờ ruộng để cá linh, cá sặc chui vào mà không lội ra được.',
    literaryContext: {
      source: 'Ca dao sông nước Cần Thơ',
      author: 'Dân gian Tây Đô',
      quote: 'Thới Long đan lọp bắt cá linh / Anh thương em gái chung tình nết na...',
      note: 'Làng nghề đan lọp Thới Long (quận Ô Môn) nổi tiếng cả trăm năm, cung cấp hàng vạn chiếc lọp cho cả vùng ĐBSCL mỗi mùa lũ về.'
    },
    exampleSentence: 'Tháng tám nước tràn bờ, ba đem chục cái lọp tre ra mé kênh ngâm đón cá linh đầu mùa.',
    culturalNote: 'Đan lọp đòi hỏi tre gai già ngâm nước ngọt để dẻo dai, vót nan hom phải đều như tơ để cá dạn dĩ bơi vào.',
    iconName: 'PackageCheck'
  },
  {
    id: 'ghe-luon-chet',
    word: 'Ghe lườn, chẹt',
    phonetic: '/ɣɛ˧˧ lɨən˨˩ - cɛt˨˩˨/',
    standardEquivalent: 'Thuyền thân tròn dài / Bè mảng đáy phẳng',
    category: 'Địa hình sông nước',
    definition: 'Ghe lườn là loại ghe khoét từ một thân cây gỗ nguyên khối, đáy cong lướt sóng tốt; Chẹt là loại xuồng bè đáy bằng phẳng chở hàng nặng qua kênh nông.',
    literaryContext: {
      source: 'Ký sự Tây Đô hào sảng',
      author: 'Huỳnh Mẫn Đạt & Văn nhân Lục tỉnh',
      quote: 'Mặt nước Cần Thơ ghe lườn chèo lướt, chẹt chở dừa chuối dập dìu qua chợ nổi Cái Răng...',
      note: 'Hệ thống ghe xuồng Nam Bộ là phương tiện huyết mạch của "Văn hóa sông nước" Cần Thơ xưa và nay.'
    },
    exampleSentence: 'Ngoại chèo chiếc ghe lườn chở rổ vú sữa Lò Rèn ra chợ nổi bán buổi sớm.',
    culturalNote: 'Vùng đất trũng ngập như Cần Thơ xưa xem ghe lườn như đôi chân di chuyển, mỗi gia đình đều có ít nhất một phương tiện thủy.',
    iconName: 'Ship'
  },
  {
    id: 'het-say',
    word: 'Hết sẩy',
    phonetic: '/het˦˥ sɐj˧˩/',
    standardEquivalent: 'Tuyệt đỉnh, trên cả tuyệt vời',
    category: 'Cảm thán & Tính cách',
    definition: 'Khẩu ngữ biểu thị sự tán thưởng cao nhất, không còn chỗ nào để chê trách hay phê bình.',
    literaryContext: {
      source: 'Chuyện vui miệt vườn Cần Thơ',
      author: 'Tạp chí Văn nghệ Tây Đô',
      quote: 'Tô bún nước lèo cá lóc đồng ăn kèm rau đắng đất ở chợ Cần Thơ ngon hết sẩy bà con ơi!',
      note: 'Từ ngữ mang sắc thái sảng khoái, bộc trực, không vòng vo của con người miệt vườn Cửu Long.'
    },
    exampleSentence: 'Bánh tráng Thuận Hưng nướng mỡ hành giòn rụm thơm phức ăn ngon hết sẩy!',
    culturalNote: 'Xuất phát từ từ "sẩy" trong sẩy thai, sẩy tay, mang nghĩa không một chút sai sót hay hao hụt nào.',
    iconName: 'Sparkles'
  },
  {
    id: 'chen-oi',
    word: 'Chèn ơi',
    phonetic: '/cɛn˨˩ ɤːj˧˧/',
    standardEquivalent: 'Trời đất ơi (thán từ)',
    category: 'Cảm thán & Tính cách',
    definition: 'Thán từ cảm thán quen thuộc đặc trưng bật ra khi ngạc nhiên, xúc động, thương cảm hoặc trách móc yêu thương.',
    literaryContext: {
      source: 'Kịch bản Cải lương Dạ Cổ Hoài Lang',
      author: 'Nhạc sĩ Cao Văn Lầu & Nghệ sĩ Cần Thơ',
      quote: 'Chèn ơi, ngọn gió chướng thổi rát mặt mà sao tía con bây còn lội ngoài bãi bồi chưa chịu vô ăn cơm...',
      note: 'Âm hưởng từ "chèn ơi" như một tiếng thở dài ấm áp nghĩa tình, đượm chất đờn ca tài tử.'
    },
    exampleSentence: 'Chèn ơi, mới có mấy năm mà con bé Tư nay lớn bộn, tráng bánh khéo tay quá chừng!',
    culturalNote: 'Là cách nói biến âm nhẹ nhàng của "Trời đất ơi", tránh gọi thẳng tên đấng thiêng liêng nhưng vẫn bộc lộ trọn vẹn cảm xúc.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'banh-cong',
    word: 'Bánh cống',
    phonetic: '/ɓaɲ˦˥ kəwŋ˦˥/',
    standardEquivalent: 'Bánh cóng (chiên khuôn cán dài)',
    category: 'Ẩm thực dân dã',
    definition: 'Đặc sản Cần Thơ làm từ bột gạo, đậu xanh, thịt heo băm và tôm tươi, đổ vào chiếc khuôn hình ống cán dài gọi là cái "cống" rồi nhúng ngập chảo dầu sôi.',
    literaryContext: {
      source: 'Ẩm thực Tây Đô - Hồn đất phương Nam',
      author: 'Nghiên cứu văn hóa ẩm thực Cần Thơ',
      quote: 'Mùi bánh cống bốc khói ngập đường Đề Thám, cuốn chung rau cải xanh, đọt xoài non chấm mắm chua ngọt làm xiêu lòng bao lữ khách...',
      note: 'Món ăn phản ánh tinh hoa nông nghiệp lúa nước kết hợp tôm sông phong phú xứ Cần Thơ.'
    },
    exampleSentence: 'Chiều mưa Ninh Kiều ghé quán bánh cống nóng hổi thì ấm bụng phải biết.',
    culturalNote: 'Dụng cụ làm bánh gọi là "cống" bằng nhôm hoặc sắt tây có chuôi dài để người thợ không bị bỏng dầu.',
    iconName: 'Soup'
  },
  {
    id: 'veo',
    word: 'Vèo',
    phonetic: '/vɛw˨˩/ (phát âm: /jɛw˨˩/)',
    standardEquivalent: 'Lồng lưới quây nuôi thủy sản dưới sông',
    category: 'Địa hình sông nước',
    definition: 'Khoang quây bằng lưới mùng cột vào cọc tre cắm ở góc kênh rạch hoặc mé ao để nuôi dưỡng ếch, cá trê, cá lóc đồng.',
    literaryContext: {
      source: 'Gia tài của mẹ bên sông Hậu',
      author: 'Truyện ký học đường Cần Thơ',
      quote: 'Góc rạch có cái vèo ếch của ngoại, tối tối nghe ếch kêu uôm uôm đợi con nước lên...',
      note: 'Mô hình kinh tế vườn - ao - chuồng kết hợp độc đáo thích nghi với dao động con nước triều cường.'
    },
    exampleSentence: 'Bác Ba vớt mớ ốc bươu băm nhỏ thả vô vèo cho bầy ếch ăn cữ chiều.',
    culturalNote: 'Phát âm Nam Bộ thường biến âm chữ "v" thành "d/g" nhẹ nghe như "dèo", biểu thị sự thích nghi linh hoạt.',
    iconName: 'Fish'
  }
];

export interface SpellCheckRule {
  pattern: RegExp;
  errorWord: string;
  correctWord: string;
  phoneticReason: string;
  category: 'Âm cuối T/C' | 'Âm cuối N/NG' | 'Dấu Hỏi/Ngã' | 'Âm đầu V/D' | 'Nguyên âm I/IÊ';
  exampleNote: string;
}

export const SOUTHERN_SPELL_RULES: SpellCheckRule[] = [
  {
    pattern: /\b(cá lót|con cá lót)\b/gi,
    errorWord: 'cá lót',
    correctWord: 'cá lóc',
    phoneticReason: 'Người Nam Bộ phát âm âm cuối "-c" và "-t" tương đối giống nhau (đều khép môi nhẹ), dễ dẫn đến nhầm lẫn chính tả giữa "lóc" (loài cá đồng) và "lót" (lót dạ, lót đường).',
    category: 'Âm cuối T/C',
    exampleNote: 'Chuẩn chính tả: "con cá lóc", "bắt cá lóc đồng".'
  },
  {
    pattern: /\b(hột míc|trái míc)\b/gi,
    errorWord: 'hột míc',
    correctWord: 'hột mít',
    phoneticReason: 'Nhầm lẫn âm cuối "-t" biến thành "-c" do thói quen khẩu ngữ phát âm tròn vành của người miền Tây.',
    category: 'Âm cuối T/C',
    exampleNote: 'Chuẩn chính tả: "hột mít luộc", "trái mít tố nữ".'
  },
  {
    pattern: /\b(mắc mũi)\b/gi,
    errorWord: 'mắc mũi',
    correctWord: 'mắt mũi',
    phoneticReason: 'Phát âm Nam Bộ lẫn lộn "mắt" (bộ phận nhìn) với "mắc" (mắc cạn, mắc lưới).',
    category: 'Âm cuối T/C',
    exampleNote: 'Chuẩn chính tả: "mắt mũi tèm lem", "hoa mắt".'
  },
  {
    pattern: /\b(nước rồng|con nước rồng)\b/gi,
    errorWord: 'nước rồng',
    correctWord: 'nước ròng',
    phoneticReason: 'Hiện tượng ngạc hóa âm cuối khiến người học sinh nhầm giữa vần "-ong" và "-ông". "Ròng" là nước triều rút kiệt, còn "rồng" là con vật truyền thuyết.',
    category: 'Âm cuối N/NG',
    exampleNote: 'Chuẩn chính tả: "nước lớn nước ròng", "mực nước ròng sát đáy".'
  },
  {
    pattern: /\b(khoai lan|củ khoai lan)\b/gi,
    errorWord: 'khoai lan',
    correctWord: 'khoai lang',
    phoneticReason: 'Khẩu ngữ Nam Bộ thường rút ngắn âm đuôi "-ang" thành "-an", dễ viết nhầm "khoai lang" thành "hoa lan / khoai lan".',
    category: 'Âm cuối N/NG',
    exampleNote: 'Chuẩn chính tả: "củ khoai lang nướng", "vườn khoai lang".'
  },
  {
    pattern: /\b(nghỉ ngợi|nghỉ tới)\b/gi,
    errorWord: 'nghỉ ngợi',
    correctWord: 'nghĩ ngợi',
    phoneticReason: 'Phương ngữ Nam Bộ hòa lẫn thanh hỏi (?) và thanh ngã (~) thành một thanh điệu hơi lượn nhẹ, dẫn đến việc dùng sai dấu hỏi thay cho dấu ngã của từ "nghĩ" (tư duy suy nghĩ).',
    category: 'Dấu Hỏi/Ngã',
    exampleNote: 'Chuẩn: "nghĩ ngợi", "suy nghĩ" (dấu ngã); phân biệt với "nghỉ ngơi", "nghỉ hè" (dấu hỏi).'
  },
  {
    pattern: /\b(mảnh liệt)\b/gi,
    errorWord: 'mảnh liệt',
    correctWord: 'mãnh liệt',
    phoneticReason: 'Lẫn lộn dấu hỏi và ngã trong các từ Hán - Việt cổ.',
    category: 'Dấu Hỏi/Ngã',
    exampleNote: 'Chuẩn: "chiến đấu mãnh liệt", "sức sống mãnh liệt".'
  },
  {
    pattern: /\b(nguy hỉm|nguy hiểm hỉm)\b/gi,
    errorWord: 'nguy hỉm',
    correctWord: 'nguy hiểm',
    phoneticReason: 'Người Tây Nam Bộ có xu hướng biến nguyên âm đôi "-iê-" thành nguyên âm đơn "-i-" trong giao tiếp hàng ngày ("hiểm" -> "hỉm").',
    category: 'Nguyên âm I/IÊ',
    exampleNote: 'Chuẩn chính tả sách giáo khoa: "nguy hiểm rình rập".'
  },
  {
    pattern: /\b(dui dẻ|dui ve)\b/gi,
    errorWord: 'dui dẻ',
    correctWord: 'vui vẻ',
    phoneticReason: 'Hiện tượng phát âm phụ âm đầu "v-" thành "d-" (hoặc "d/gi") rất phổ biến ở vùng sông nước đồng bằng sông Cửu Long.',
    category: 'Âm đầu V/D',
    exampleNote: 'Khẩu ngữ nói "dui dẻ", nhưng văn bản báo cáo thu hoạch phải viết chuẩn "vui vẻ".'
  },
  {
    pattern: /\b(dề nhà|dề quê)\b/gi,
    errorWord: 'dề nhà',
    correctWord: 'về nhà',
    phoneticReason: 'Phụ âm "v" phát âm thành "d" trong văn nói.',
    category: 'Âm đầu V/D',
    exampleNote: 'Chuẩn chính tả toàn dân: "về nhà", "trở về quê hương".'
  }
];

export interface SpellDiagnosisResult {
  originalText: string;
  highlightedText: string;
  foundErrors: {
    matchedWord: string;
    suggestedWord: string;
    category: string;
    explanation: string;
    index: number;
  }[];
  scoreGrade: number; // 0 - 10
  feedbackComment: string;
}

export function diagnoseSouthernSpelling(text: string): SpellDiagnosisResult {
  if (!text || text.trim() === '') {
    return {
      originalText: text,
      highlightedText: text,
      foundErrors: [],
      scoreGrade: 10,
      feedbackComment: 'Vui lòng nhập đoạn văn của cháu để bác chẩn đoán nghen!'
    };
  }

  const foundErrors: SpellDiagnosisResult['foundErrors'] = [];
  let correctedString = text;

  SOUTHERN_SPELL_RULES.forEach((rule) => {
    let match: RegExpExecArray | null;
    const regex = new RegExp(rule.pattern.source, 'gi');
    while ((match = regex.exec(text)) !== null) {
      foundErrors.push({
        matchedWord: match[0],
        suggestedWord: rule.correctWord,
        category: rule.category,
        explanation: rule.phoneticReason,
        index: match.index
      });
    }
  });

  const penalty = Math.min(foundErrors.length * 1.5, 6.0);
  const finalScore = Math.max(10 - penalty, 4.0);

  let comment = '';
  if (foundErrors.length === 0) {
    comment = 'Tuyệt vời lắm cháu! Câu văn của cháu dùng chuẩn từ ngữ toàn dân, không bị lẫn lộn âm điệu phương ngữ Nam Bộ.';
  } else if (foundErrors.length <= 2) {
    comment = 'Cháu viết văn rất mộc mạc và giàu cảm xúc, chỉ còn vướng một vài chỗ phát âm sao ghi vậy của tiếng miền Tây mình. Hãy sửa lại theo gợi ý để bài báo cáo thu hoạch chỉn chu nghen!';
  } else {
    comment = 'Cháu bị ảnh hưởng khá nhiều bởi thói quen nói tiếng Nam Bộ khi viết chính tả (nhất là dấu hỏi/ngã và âm đuôi t/c). Đừng lo, nghệ nhân và thầy cô sẽ cùng cháu rèn từng nét chữ!';
  }

  return {
    originalText: text,
    highlightedText: correctedString,
    foundErrors,
    scoreGrade: Math.round(finalScore * 10) / 10,
    feedbackComment: comment
  };
}
