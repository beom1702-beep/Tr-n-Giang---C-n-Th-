import { GoogleGenAI } from '@google/genai';
import { ARTISAN_KNOWLEDGE_BASE, checkArtisanRefusal, searchLocalKnowledge } from '../data/ragArtisanData.ts';
import { calculateLocalRubric } from '../data/rubricCriteria.ts';

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

export async function handleArtisanChat(message: string, history: { role: string; text: string }[] = []) {
  // Hard shield check: If student asks to write homework / report, refuse warmly in authentic Bac Ba Lap persona
  const isRefusalTriggered = checkArtisanRefusal(message);
  if (isRefusalTriggered) {
    return {
      reply: `Chèn ơi cháu tôi ơi! Bác Ba là người rứt ruột giữ cái nghề tráng bánh Thuận Hưng hơn nửa đời người, bác sẵn lòng thức thâu đêm kể cho cháu nghe từ chuyện chọn gạo khô cũ xát bột, tới chuyện canh con nắng trên liếp tre, chớ tuyệt đối bác hổng có "viết giùm" bài thu hoạch cho cháu được đâu nghen!\n\nCháu là học trò Tây Đô, phải tự tay cầm ngòi bút của mình ghi lại những điều mắt thấy tai nghe, mồ hôi công sức của bà con làng nghề thì con chữ nó mới có hồn, thầy cô mới thương! Bây giờ cháu thử nhớ lại xem: Bánh tráng Thuận Hưng mình có mấy loại chính nè? Hay là cháu ghi lại kỹ thuật đan lọp bắt cá linh của bà con Thới Long nghen? Bác ngồi đây chỉ dẫn thêm cho cháu, ráng lên cháu ngoan!`,
      isRefusal: true,
      suggestedQuestions: [
        'Bác Ba ơi, gạo làm bánh tráng Thuận Hưng phải là gạo gì vậy bác?',
        'Bác chỉ cháu cách canh con nắng sớm trên liếp tre với!',
        'Làng đan lọp Thới Long dùng loại tre nào để bẫy cá linh mùa lũ?'
      ]
    };
  }

  // RAG retrieval: Search relevant knowledge
  const ragSnippets = searchLocalKnowledge(message);
  const ragContext = ragSnippets.length > 0
    ? `DỮ LIỆU THỰC TẾ LÀNG NGHỀ (RAG KNOWLEDGE):\n${ragSnippets.join('\n')}`
    : `DỮ LIỆU THỰC TẾ LÀNG NGHỀ:\n- Làng bánh tráng Thuận Hưng (Thốt Nốt, Cần Thơ): hơn 200 năm, 4 loại bánh (nem, mặn, xốp, dừa), gạo khô cũ xát thấu bột, tráng nồi hơi vải căng, vớt bánh bằng nan tre, phơi nắng sớm trên liếp tre dài 2m, dỡ trưa tránh giòn bể.\n- Làng đan lọp Thới Long (Ô Môn): tre già ngâm nước ngọt, bện hom bắt cá linh non mùa lũ.\n- Đờn ca tài tử: 20 bản tổ, đờn kìm, đờn tranh trên ghe thuyền Ninh Kiều.`;

  const systemInstruction = `Bạn là Bác Ba Lập, một nghệ nhân tráng bánh lâu năm tại Làng bánh tráng Thuận Hưng (quận Thốt Nốt, Cần Thơ).
VĂN PHONG BẮT BUỘC: Chân chất, mộc mạc, dùng khẩu ngữ Nam Bộ tự nhiên (xưng "bác" - gọi "cháu", dùng các từ đệm: nghen, đa đoan, liếp phơi, con nước nổi, chèn ơi, hết sẩy).

TRI THỨC CỐT LÕI (RAG KNOWLEDGE):
${ragContext}

QUY TẮC BẮT BUỘC:
1. Trả lời nhiệt tình, hào sảng các câu hỏi về nghề truyền thống quê hương Cần Thơ, chia sẻ chi tiết mẹo nghề thực tế.
2. TUYỆT ĐỐI TỪ CHỐI nếu học sinh yêu cầu viết giùm đoạn văn báo cáo thu hoạch. Hãy nhắc nhở cháu tự dùng ngòi bút của mình ghi lại những điều vừa nghe được.
3. Độ dài phản hồi vừa phải (khoảng 3-4 đoạn ngắn), truyền cảm hứng yêu di sản Tây Đô cho các cháu học sinh khối 8-9.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...history.slice(-4).map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          })),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        config: {
          systemInstruction,
        }
      });

      const text = response.text || '';
      if (text.trim()) {
        return {
          reply: text,
          isRefusal: false,
          suggestedQuestions: [
            'Bác Ba ơi, tại sao phải dùng gạo khô cũ mà không dùng gạo mới?',
            'Bác có nhớ bài ca dao nào về làng bánh tráng Thuận Hưng hông bác?',
            'Chiếc lọp Thới Long bẫy cá linh non hoạt động ra sao vậy bác?'
          ]
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, using high-fidelity local RAG:', err);
    }
  }

  // Fallback intelligent response using RAG Knowledge
  const matched = ARTISAN_KNOWLEDGE_BASE.find(item =>
    item.keywords.some(kw => message.toLowerCase().includes(kw))
  );

  let fallbackReply = '';
  if (matched) {
    fallbackReply = `Cháu hỏi trúng chỗ rồi đó nghen! ${matched.content} ${matched.folkSaying ? `Dân xứ mình hay hát câu này nè cháu: "${matched.folkSaying}"` : ''} Cháu nhớ kỹ mấy ý này đặng hồi làm bài báo cáo thu hoạch cho thiệt hay nghe hôn!`;
  } else {
    fallbackReply = `Ờ cháu hỏi nghe thương quá! Đất Cần Thơ mình trù phú nhờ con nước nổi sông Hậu, vừa có làng bánh tráng Thuận Hưng hơn hai trăm năm đỏ lửa, vừa có làng đan lọp Thới Long mần ăn mùa cá linh. Cháu cứ hỏi cặn kẽ từng khâu, từ chọn gạo khô cũ, xát bột thấu, tráng nồi hơi tới canh con nắng sớm liếp tre, bác kể ráo trọi cho cháu nghe nghen!`;
  }

  return {
    reply: fallbackReply,
    isRefusal: false,
    suggestedQuestions: [
      'Bác Ba ơi làm sao để bánh tráng nem chiên lên vàng giòn không bể?',
      'Bánh tráng dừa Thuận Hưng có gì đặc biệt vậy bác?',
      'Làng đan lọp Thới Long mùa nước nổi nhộn nhịp ra sao?'
    ]
  };
}

export async function handleRubricEvaluate(draft1: string, draft2: string, topic?: string) {
  // Verify draft content
  const textToEvaluate = (draft2 && draft2.trim().length > 30) ? draft2 : draft1;
  const localEval = calculateLocalRubric(draft1, draft2);

  if (!textToEvaluate || textToEvaluate.trim().length < 20) {
    return {
      error: 'Vui lòng nhập nội dung bản thảo bài thu hoạch (tối thiểu 20 từ) để hệ thống đánh giá theo Rubric.',
      report: localEval
    };
  }

  const prompt = `Bạn là Trợ lý Sư phạm Đánh giá Rubric môn Giáo dục địa phương Cần Thơ cấp THCS (khối 8-9).
Dựa trên dữ liệu thực nghiệm 12 tuần trên 274 học sinh THCS tại quận Ninh Kiều, Cần Thơ.

NHIỆM VỤ:
Đánh giá khách quan bài thu hoạch của học sinh theo Rubric 4 tiêu chí (Thang 10 điểm):
1. Kiến thức Cần Thơ (Tối đa 3.0 điểm): Độ chuẩn xác về mốc lịch sử (Đạo Trấn Giang 1739, Hạt Cần Thơ 1876, Chi bộ Cờ Đỏ 1929, Lộ Vòng Cung 1968), địa danh, nhân vật lịch sử, làng nghề.
2. Chất liệu thực tế (Tối đa 3.0 điểm): Dẫn chứng từ trạm khảo sát Ninh Kiều (Bảo tàng Cần Thơ, Chợ cổ 1915, mật độ 10.005 người/km2, triều cường sông Hậu, phân loại rác, phỏng vấn Bác Ba Lập).
3. Cấu trúc & chuẩn chính tả (Tối đa 2.0 điểm): Bố cục Mở - Thân - Kết mạch lạc, chuẩn chính tả tiếng Việt, không sai lỗi chính tả âm điệu Nam Bộ (t/c, n/ng, hỏi/ngã, v/d).
4. Giải pháp vận dụng sáng tạo (Tối đa 2.0 điểm): Ý tưởng của học sinh THCS nhằm bảo tồn di sản Tây Đô hoặc giải pháp bảo vệ môi trường Ninh Kiều.

KHÓA PROMPT CỨNG (HARD PROMPT SHIELD):
- TUYỆT ĐỐI KHÔNG VIẾT HỘ bài văn cho học sinh!
- CHỈ phân tích ưu điểm, nhược điểm, chỉ ra chỗ cần sửa và đặt câu hỏi gợi mở để học sinh tự nâng cấp bài từ Bản thảo 1 lên Bản hoàn thiện.

BẢN THẢO 1:
"""
${draft1}
"""

BẢN THẢO 2 (Bản nâng cấp):
"""
${draft2 || '(Học sinh chưa tạo Bản thảo 2, đang chấm trên Bản thảo 1)'}
"""

Trả về duy nhất định dạng JSON thuần túy (không markdown block nếu có thể hoặc bọc json chuẩn):
{
  "score1": number (0 to 3.0),
  "score2": number (0 to 3.0),
  "score3": number (0 to 2.0),
  "score4": number (0 to 2.0),
  "totalScore": number (0 to 10.0),
  "gradeCategory": "Xuất sắc (Giỏi)" | "Khá" | "Trung bình" | "Cần rèn luyện thêm",
  "criteriaFeedback": [
    {
      "criterionId": "kien-thuc-can-tho",
      "score": number,
      "pros": ["ưu điểm 1", "ưu điểm 2"],
      "improvements": ["gợi mở tự sửa 1", "gợi mở tự sửa 2"]
    },
    {
      "criterionId": "chat-lieu-thuc-te",
      "score": number,
      "pros": ["..."],
      "improvements": ["..."]
    },
    {
      "criterionId": "cau-truc-chinh-ta",
      "score": number,
      "pros": ["..."],
      "improvements": ["..."]
    },
    {
      "criterionId": "sang-tao-giai-phap",
      "score": number,
      "pros": ["..."],
      "improvements": ["..."]
    }
  ],
  "generalAssessment": "Nhận xét tổng quát sư phạm",
  "bacBaLapAdvice": "Lời dặn dò chân tình bằng giọng điệu Bác Ba Lập (xưng bác gọi cháu, khuyên tự viết)",
  "nextStepRecommendations": ["hướng dẫn 1", "hướng dẫn 2", "hướng dẫn 3"]
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.totalScore !== undefined) {
        return {
          report: {
            score1: Number(parsed.score1) || localEval.score1,
            score2: Number(parsed.score2) || localEval.score2,
            score3: Number(parsed.score3) || localEval.score3,
            score4: Number(parsed.score4) || localEval.score4,
            totalScore: Number(parsed.totalScore) || localEval.totalScore,
            gradeCategory: parsed.gradeCategory || localEval.gradeCategory,
            feedbackCriteria: parsed.criteriaFeedback || localEval.feedbackCriteria,
            generalAssessment: parsed.generalAssessment || localEval.generalAssessment,
            bacBaLapAdvice: parsed.bacBaLapAdvice || localEval.bacBaLapAdvice,
            nextStepRecommendations: parsed.nextStepRecommendations || localEval.nextStepRecommendations,
            draftComparisonHighlights: localEval.draftComparisonHighlights
          }
        };
      }
    } catch (err) {
      console.warn('Gemini Rubric evaluation error, using calibrated local engine:', err);
    }
  }

  return { report: localEval };
}
