export interface ArtisanKnowledgeItem {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
  folkSaying?: string;
}

export const ARTISAN_KNOWLEDGE_BASE: ArtisanKnowledgeItem[] = [
  {
    id: 'thuan-hung-history',
    topic: 'Lịch sử làng bánh tráng Thuận Hưng',
    keywords: ['lịch sử', 'thuận hưng', 'bao lâu', 'mấy trăm năm', 'nguồn gốc', 'thốt nốt'],
    content: 'Làng bánh tráng Thuận Hưng bên dòng sông Thốt Nốt có bề dày hơn 200 năm lịch sử rồi đó cháu. Từ thời ông bà mở đất, lò bánh đỏ lửa quanh năm, tới nay cả ngàn hộ dân cha truyền con nối giữ nghề tổ.',
    folkSaying: 'Bánh tráng Thuận Hưng thơm lừng con nắng / Đậm đà vị ngọt tình nghĩa Tây Đô.'
  },
  {
    id: 'thuan-hung-four-types',
    topic: '4 loại bánh chính ở Thuận Hưng',
    keywords: ['4 loại', 'loại bánh', 'bánh nem', 'bánh mặn', 'bánh xốp', 'bánh dừa', 'mấy loại'],
    content: 'Ở Thuận Hưng mình làm ra 4 loại bánh rường cột: Bánh tráng nem (dẻo mềm, cuốn chả giò chiên vàng giòn rụm không gãy); Bánh tráng mặn (nêm muối ớt hành mè ăn liền hoặc nướng); Bánh tráng xốp (bột pha phồng nở giòn tan trên than hồng); và Bánh tráng dừa (béo ngậy nước cốt dừa xiêm, mè rang thơm phức).',
    folkSaying: 'Nem chua, mặn đậm, dừa béo, xốp thơm / Bốn mùi bánh thảo trọn tình quê hương.'
  },
  {
    id: 'thuan-hung-technique',
    topic: 'Kỹ thuật tráng bánh và bí quyết',
    keywords: ['kỹ thuật', 'bí quyết', 'làm sao', 'cách làm', 'gạo gì', 'xát bột', 'nồi hơi', 'liếp tre'],
    content: 'Muốn bánh ngon đạt chuẩn, trước hết phải chọn "gạo khô cũ" (để qua mùa cho ráo nhựa, không dùng gạo mới vì bánh sẽ nhão chảy). Xát bột phải thật thấu, lọc kỹ cho nước bột trong vắt. Khi tráng trên nồi hơi bọc vải căng, tay thợ phải đều như múa, xoay gáo dừa mỏng đều tăm tắp, rồi dùng nan tre luồn dưới bánh vớt ra trải lên liếp tre phơi.',
    folkSaying: 'Gạo cũ xay thấu, nước sôi hơi tràn / Trở tay nan dẻo, phơi râm liếp vàng.'
  },
  {
    id: 'thuan-hung-sun-drying',
    topic: 'Canh con nắng và phơi bánh',
    keywords: ['canh nắng', 'phơi', 'liếp phơi', 'mặt trời', 'buổi trưa', 'dỡ bánh'],
    content: 'Nghề tráng bánh cực nhất là canh con nắng nghen cháu! Bánh phải đón con nắng sớm từ lúc mặt trời mới ló dạng đến tầm trưa. Phải canh vừa ráo là đem vô mát "ủ dỡ" liền, nếu để nắng gắt quá bánh sẽ bị nổ giòn, cong queo và dễ bể gãy tan tành.',
    folkSaying: 'Canh con nắng sớm liếp tre / Trưa trờ trưa trật rước về nhà êm.'
  },
  {
    id: 'thoi-long-fish-traps',
    topic: 'Làng nghề đan lọp Thới Long (Ô Môn)',
    keywords: ['thới long', 'đan lọp', 'lọp', 'ô môn', 'cá linh', 'bẫy cá', 'mùa lũ', 'nước nổi'],
    content: 'Cách Thuận Hưng một đoạn xuôi về Ô Môn là làng nghề đan lọp Thới Long danh bất hư truyền. Bà con ở đây dùng tre gai già chịu được nước ngọt quanh năm ngâm bùn, chẻ nan chuốt bóng bện thành chiếc lọp với chiếc "hom" dẻo quẹo. Cứ hễ con nước nổi tháng 8-9 âm lịch cá linh non từ thượng nguồn đổ về là lọp Thới Long xuống đồng bẫy cá linh, tôm tép mập mạp béo ngậy.',
    folkSaying: 'Lọp Thới Long nằm đợi con nước lớn / Cá linh vô hom dạ sướng ngất ngây.'
  },
  {
    id: 'don-ca-tai-tu',
    topic: 'Đờn ca tài tử và văn hóa sông nước',
    keywords: ['đờn ca tài tử', 'tài tử', 'đờn kìm', 'đờn tranh', 'dạ cổ hoài lang', '20 bản tổ'],
    content: 'Làm bánh hay đan lọp xong, chiều chiều bà con Tây Đô lại tụ họp dưới bóng dừa hay trên chiếc ghe lườn cất tiếng đờn ca tài tử. Với 20 bản tổ, tiếng đờn kìm trầm đục hòa với tiếng đờn tranh lảnh lót ngân nga điệu Dạ Cổ Hoài Lang, nuôi dưỡng tâm hồn con người Cần Thơ hào sảng, chân chất mà trượng nghĩa.',
    folkSaying: 'Bến Ninh Kiều trăng thanh gió mát / Khúc phụng hoàng đàn hát say lòng.'
  }
];

export const REFUSAL_ESSAY_PROMPTS = [
  'viết giùm', 'viết hộ', 'làm giúp bài', 'viết bài thu hoạch', 'viết đoạn văn giúp',
  'viết bài báo cáo', 'viết giúp em', 'viết giúp cháu', 'làm bài hộ', 'viết một bài thu hoạch'
];

export function checkArtisanRefusal(userMessage: string): boolean {
  const lower = userMessage.toLowerCase();
  return REFUSAL_ESSAY_PROMPTS.some((kw) => lower.includes(kw));
}

export function searchLocalKnowledge(query: string): string[] {
  const lower = query.toLowerCase();
  const matched = ARTISAN_KNOWLEDGE_BASE.filter((item) =>
    item.keywords.some((kw) => lower.includes(kw)) ||
    lower.includes(item.topic.toLowerCase())
  );
  return matched.map((m) => `${m.topic}: ${m.content} ${m.folkSaying ? `(Ca dao tục ngữ: "${m.folkSaying}")` : ''}`);
}
