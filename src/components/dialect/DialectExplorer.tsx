import React, { useState } from 'react';
import {
  DIALECT_CARDS,
  DialectCard,
  SOUTHERN_SPELL_RULES,
  diagnoseSouthernSpelling,
  SpellDiagnosisResult
} from '../../data/dialectData.ts';
import { speakVietnamese } from '../../utils/vietnameseSpeech.ts';
import {
  Flame,
  Grid,
  Waves,
  Flower2,
  PackageCheck,
  Ship,
  Sparkles,
  HeartHandshake,
  Soup,
  Fish,
  RotateCw,
  Search,
  BookOpen,
  Volume2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  FileCheck
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-5 h-5" />,
  Grid: <Grid className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Flower2: <Flower2 className="w-5 h-5" />,
  PackageCheck: <PackageCheck className="w-5 h-5" />,
  Ship: <Ship className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Soup: <Soup className="w-5 h-5" />,
  Fish: <Fish className="w-5 h-5" />,
};

export const DialectExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cards' | 'spellcheck'>('cards');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Spellcheck state
  const [studentInput, setStudentInput] = useState(
    'Hôm nay nhóm em dề quê Thốt Nốt bắt con cá lót đem nướng trui, rồi nghỉ ngợi cách làm củ khoai lan cho dui dẻ.'
  );
  const [diagnosisResult, setDiagnosisResult] = useState<SpellDiagnosisResult | null>(null);

  const categories = ['Tất cả', 'Địa hình sông nước', 'Đời sống sinh hoạt', 'Ẩm thực dân dã', 'Cảm thán & Tính cách', 'Dụng cụ truyền thống'];

  const toggleFlip = (cardId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleSpeak = (card: DialectCard, e: React.MouseEvent) => {
    e.stopPropagation();
    const narration = `Từ phương ngữ: ${card.word}. Nghĩa toàn dân: ${card.standardEquivalent}. Giải thích: ${card.definition}. Ví dụ: ${card.exampleSentence}`;
    speakVietnamese(narration, { rate: 0.92 });
  };

  const filteredCards = DIALECT_CARDS.filter(card => {
    const matchesCat = selectedCategory === 'Tất cả' || card.category === selectedCategory;
    const matchesQuery = card.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.standardEquivalent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleRunDiagnosis = () => {
    const res = diagnoseSouthernSpelling(studentInput);
    setDiagnosisResult(res);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'cards'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Thẻ Phương Ngữ 3D Lật Mặt ({DIALECT_CARDS.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('spellcheck');
              if (!diagnosisResult) handleRunDiagnosis();
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'spellcheck'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" /> Bộ Lọc Chẩn Đoán Lỗi Chính Tả Nam Bộ
          </button>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline px-3 py-1 bg-slate-800/80 rounded-lg">
          Ngữ liệu Văn học Cần Thơ (Sơn Nam, Bùi Hữu Nghĩa, Ca dao Tây Đô)
        </span>
      </div>

      {/* VIEW 1: 3D FLASHCARDS */}
      {activeTab === 'cards' && (
        <div className="flex flex-col gap-5">
          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm từ phương ngữ..."
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Nhấp vào thẻ để lật mặt 3D xem văn cảnh tác phẩm và câu văn mẫu</span>
            <span className="text-amber-400 font-semibold">Đã lọc: {filteredCards.length} từ ngữ</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCards.map((card) => {
              const isFlipped = flippedCards[card.id] || false;
              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className="perspective-1000 h-[360px] cursor-pointer group"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT OF CARD */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 flex flex-col justify-between shadow-xl hover:border-amber-500/60 transition-colors">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-medium border border-slate-700">
                            {card.category}
                          </span>
                          <button
                            onClick={(e) => handleSpeak(card, e)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                            title="Nghe phát âm tiếng Việt"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Nghe</span>
                          </button>
                        </div>

                        <div className="my-3 text-center">
                          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 mb-2 border border-amber-500/20">
                            {iconMap[card.iconName] || <Sparkles className="w-5 h-5" />}
                          </div>
                          <h3 className="text-2xl font-extrabold text-white font-serif-title tracking-wide">
                            {card.word}
                          </h3>
                          <p className="text-xs font-mono text-slate-400 mt-0.5">{card.phonetic}</p>
                          <span className="text-[10px] text-amber-300/90 font-medium block mt-1">
                            [Phát âm Nam Bộ chuẩn miền Tây]
                          </span>
                        </div>

                        <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60 mb-2 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tiếng Việt toàn dân:</span>
                          <span className="text-xs font-bold text-amber-300">{card.standardEquivalent}</span>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-3 text-center leading-relaxed">
                          {card.definition}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                          <RotateCw className="w-3.5 h-3.5" /> Lật xem ngữ cảnh
                        </span>
                        <span className="italic">{card.culturalNote.slice(0, 32)}...</span>
                      </div>
                    </div>

                    {/* BACK OF CARD */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/50 p-5 flex flex-col justify-between shadow-2xl">
                      <div className="space-y-3 overflow-y-auto pr-1">
                        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" /> Văn cảnh tác phẩm
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{card.word}</span>
                        </div>

                        <div className="bg-slate-950/70 p-3 rounded-xl border border-amber-500/20">
                          <p className="text-xs text-amber-200/90 italic leading-relaxed mb-1.5 font-serif-title">
                            "{card.literaryContext.quote}"
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                            <span className="font-semibold text-slate-300">{card.literaryContext.author}</span>
                            <span>{card.literaryContext.source}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                            Ví dụ câu văn chuẩn mực:
                          </span>
                          <p className="text-xs text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            "{card.exampleSentence}"
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1">
                            Ghi chú văn hóa miệt vườn:
                          </span>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {card.culturalNote}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-400">
                          <RotateCw className="w-3.5 h-3.5" /> Lật về mặt trước
                        </span>
                        <span className="text-amber-400 text-[10px] font-semibold">Tây Đô Số EdTech</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: DIALECT SPELLCHECKER */}
      {activeTab === 'spellcheck' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input & Diagnostic Area */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-amber-400" />
                    Bộ lọc Chẩn đoán Lỗi Chính tả Âm điệu Nam Bộ
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rà soát các lỗi phát âm sao viết vậy (T/C, N/NG, Dấu hỏi/ngã, V/D, I/IÊ)
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStudentInput('Hôm nay nhóm em dề quê Thốt Nốt bắt con cá lót đem nướng trui, rồi nghỉ ngợi cách làm củ khoai lan cho dui dẻ.');
                    setTimeout(handleRunDiagnosis, 50);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Nạp câu mẫu có lỗi
                </button>
              </div>

              <textarea
                value={studentInput}
                onChange={e => setStudentInput(e.target.value)}
                rows={5}
                placeholder="Nhập câu văn hoặc đoạn bài thu hoạch của cháu vào đây..."
                className="w-full bg-slate-950 border border-slate-700 text-sm text-slate-100 p-3.5 rounded-xl focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {studentInput.split(/\s+/).filter(Boolean).length} từ | Khuyên dùng cho Bản thảo bài thu hoạch
                </span>
                <button
                  onClick={handleRunDiagnosis}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Quét & Chẩn Đoán Lỗi Ngay
                </button>
              </div>
            </div>

            {/* Diagnostic Results */}
            {diagnosisResult && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-slate-400">Kết quả phân tích:</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      diagnosisResult.foundErrors.length === 0
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {diagnosisResult.foundErrors.length === 0 ? 'Chuẩn chỉnh 100%' : `Phát hiện ${diagnosisResult.foundErrors.length} điểm cần sửa`}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 mr-2">Điểm chuẩn chính tả:</span>
                    <span className="text-lg font-black text-amber-400">{diagnosisResult.scoreGrade}/10</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400 text-xs">Lời phê sư phạm:</span>
                    <button
                      onClick={() => speakVietnamese(diagnosisResult.feedbackComment, { rate: 0.92 })}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] cursor-pointer"
                      title="Nghe lời phê bằng tiếng Việt"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe lời phê tiếng Việt
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {diagnosisResult.feedbackComment}
                  </p>
                </div>

                {/* Error items list */}
                {diagnosisResult.foundErrors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Chi tiết các từ ngữ cần điều chỉnh:
                    </h4>
                    {diagnosisResult.foundErrors.map((err, i) => (
                      <div key={i} className="bg-slate-950 border border-amber-500/30 p-3 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 line-through font-semibold">
                              {err.matchedWord}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              {err.suggestedWord}
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {err.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {err.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theoretical Rules & Linguistic Knowledge Guide */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Cẩm nang Ngữ âm học Phương ngữ Nam Bộ
              </h3>
              <p className="text-xs text-slate-400">
                Hiểu đúng quy luật âm thanh để tự hào về giọng nói quê mình nhưng vẫn viết đúng chuẩn mực tiếng Việt toàn dân:
              </p>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-amber-300 mb-1">1. Hiện tượng nhầm lẫn âm cuối T và C</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Khẩu ngữ Nam Bộ khép vòm họng nhẹ nên <span className="text-amber-400 font-semibold">cá lóc</span> phát âm gần như <span className="italic">cá lót</span>, <span className="text-amber-400 font-semibold">hột mít</span> thành <span className="italic">hột míc</span>. Trong văn bản cần tra từ điển đối chiếu.
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-amber-300 mb-1">2. Hòa lẫn thanh Hỏi (?) và thanh Ngã (~)</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Người miền Tây nói dấu ngã hơi hạ thấp thành dấu hỏi: <span className="text-amber-400 font-semibold">nghĩ ngợi</span> (suy nghĩ) dễ bị viết nhầm thành <span className="italic">nghỉ ngợi</span> (nghỉ ngơi). Mẹo nhớ: các từ chỉ hoạt động tư duy tâm trí đều viết dấu ngã!
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-amber-300 mb-1">3. Âm đầu V thành D/Gi</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Người Nam Bộ nói chuyện rất thân thương khi nói <span className="italic">"dui dẻ"</span>, <span className="italic">"dề nhà"</span>. Khi viết báo cáo thu hoạch cần chuyển thành <span className="text-emerald-400 font-semibold">"vui vẻ"</span>, <span className="text-emerald-400 font-semibold">"về nhà"</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
