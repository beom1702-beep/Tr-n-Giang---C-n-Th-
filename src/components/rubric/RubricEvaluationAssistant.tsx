import React, { useState } from 'react';
import {
  RUBRIC_CRITERIA,
  EvaluationReport,
  calculateLocalRubric
} from '../../data/rubricCriteria.ts';
import {
  Sparkles,
  ShieldAlert,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Lightbulb,
  Check,
  SplitSquareVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RubricEvaluationAssistant: React.FC = () => {
  const [draft1, setDraft1] = useState<string>(
    `Em xin báo cáo về chuyến đi Cần Thơ. Thành phố Cần Thơ rất đẹp và vui dẻ. Nhóm em có ghé bến Ninh Kiều ăn bánh tráng và xem sông Hậu. Em thấy có bảo tàng và nhà lồng chợ cổ xây dựng năm 1915. Mọi người ở đây bắt con cá lót ăn rất ngon. Em nghĩ mọi người nên bảo vệ môi trường để Cần Thơ mãi đẹp.`
  );

  const [draft2, setDraft2] = useState<string>(
    `BÁO CÁO THU HOẠCH ĐIỀN DÃ: DÒNG CHẢY DI SẢN VÀ ĐÔ THỊ TÂY ĐÔ
Họ và tên học sinh: Nhóm Nghiên cứu Trẻ THCS Ninh Kiều (Khối 8-9)

I. Mở đầu:
Vùng đất Cần Thơ được khởi lập từ năm 1739 khi Đô đốc Mạc Thiên Tích lập ra Đạo Trấn Giang bên bờ sông Hậu. Trải qua hơn hai thế kỷ phát triển từ Hạt Cần Thơ (1876) đến nay, Tây Đô luôn giữ vai trò thủ phủ trù phú của miền Tây sông nước.

II. Chất liệu thực tế & Trải nghiệm điền dã:
Trong đợt khảo sát tại quận Ninh Kiều, nhóm em đã trực tiếp ghé thăm Bảo tàng Cần Thơ (Số 1 Hòa Bình) để nghiên cứu cổ vật Óc Eo và Nhà lồng Chợ cổ Cần Thơ (xây dựng năm 1915) với mái vòm giao thoa văn hóa Đông Dương.
Đặc biệt, qua trò chuyện cùng nghệ nhân Bác Ba Lập tại làng bánh tráng Thuận Hưng (hơn 200 năm lịch sử), em đã hiểu được nỗi nhọc nhằn khi phải chọn "gạo khô cũ" xát bột thấu, tráng bánh đều tay trên nồi hơi và canh con nắng sáng trên từng liếp phơi tre dài 2m. Bên cạnh đó, số liệu đo đạc thực tế cho thấy quận Ninh Kiều có mật độ dân số rất cao (10.005 người/km²) và mực nước triều cường sông Hậu đạt đỉnh +2.15m gây ngập đường Hai Bà Trưng.

III. Giải pháp vận dụng sáng tạo:
Từ góc nhìn học sinh THCS, em đề xuất 2 giải pháp thiết thực:
1. Thành lập "Câu lạc bộ Đại sứ Di sản Tây Đô" trong trường học để làm các video số giới thiệu 4 loại bánh tráng Thuận Hưng và làng đan lọp Thới Long lên mạng xã hội.
2. Vận động bạn bè cùng gia đình thực hiện phân loại rác thải tại nguồn (tách biệt rác hữu cơ và rác tái chế) tại khu vực công viên Bến Ninh Kiều để tránh rác trôi dạt làm ô nhiễm dòng sông Hậu.

Em xin trân trọng cảm ơn sự hướng dẫn tận tình của thầy cô và Bác Ba Lập!`
  );

  const [activeView, setActiveView] = useState<'editor' | 'report'>('editor');
  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/rubric-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft1, draft2 })
      });

      if (!response.ok) {
        throw new Error('Đường truyền gặp sự cố');
      }

      const data = await response.json();
      if (data.report) {
        setEvaluationReport(data.report);
        setActiveView('report');
        if (data.report.totalScore >= 8.0) {
          try {
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (err) {
      console.warn('Evaluation failed via API, falling back to pedagogical engine:', err);
      const localReport = calculateLocalRubric(draft1, draft2);
      setEvaluationReport(localReport);
      setActiveView('report');
    } finally {
      setIsEvaluating(false);
    }
  };

  const wordCount1 = draft1.split(/\s+/).filter(Boolean).length;
  const wordCount2 = draft2.split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Phân Hệ 3
            </span>
            <span className="text-xs text-slate-400">
              Định chuẩn THCS Ninh Kiều (12 tuần thực nghiệm - 274 học sinh)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-serif-title">
            Trợ Lý Phản Hồi AI Theo Rubric 4 Tiêu Chí (Thang 10 Điểm)
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Khóa Prompt Cứng: Không viết hộ - Chỉ phân tích & gợi ý học sinh tự tay nâng cấp bài viết
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'editor'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            So sánh Bản thảo (1 & 2)
          </button>
          <button
            onClick={() => {
              if (!evaluationReport) handleEvaluate();
              else setActiveView('report');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'report'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bảng Điểm Rubric & Lời Phê
          </button>
        </div>
      </div>

      {/* VIEW 1: DUAL EDITOR (SIDE-BY-SIDE DRAFT 1 VS DRAFT 2) */}
      {activeView === 'editor' && (
        <div className="flex flex-col gap-5">
          {/* Hard Shield Alert Callout */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300">Nguyên lý Sư phạm Thực nghiệm: </span>
              Học sinh đưa ra Bản thảo 1 sơ khởi, sau đó đối thoại cùng Bác Ba Lập và khảo sát các trạm Ninh Kiều để bổ sung số liệu thực tế, sửa lỗi chính tả phương ngữ và đề xuất giải pháp vào Bản thảo 2. AI đóng vai trò người phản hồi đồng hành, tuyệt đối không tạo văn mẫu thay thế tư duy của các em!
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Draft 1 Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Bản thảo 1 (Khảo sát sơ khởi)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{wordCount1} từ</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Bản ghi chép ban đầu của học sinh (thường còn mắc lỗi chính tả âm giọng hoặc thiếu số liệu thực địa).
                </p>

                <textarea
                  value={draft1}
                  onChange={e => setDraft1(e.target.value)}
                  rows={14}
                  className="w-full bg-slate-950 border border-slate-700 text-xs md:text-sm text-slate-300 p-3.5 rounded-xl focus:outline-none focus:border-slate-500 font-sans leading-relaxed"
                  placeholder="Dán hoặc nhập nội dung Bản thảo 1 của cháu vào đây..."
                />
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Mẹo: Quan sát sự khác biệt khi nâng cấp lên Bản thảo 2 bên phải.
              </div>
            </div>

            {/* Draft 2 Card (Upgraded) */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-3 relative">
              <div className="absolute top-3 right-4 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                Bản nâng cấp
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      Bản hoàn thiện 2 (Sau điền dã)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-bold">{wordCount2} từ</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Tích hợp số liệu trạm Ninh Kiều (10.005 người/km²), chuyện nghề Bác Ba Lập, và giải pháp sáng tạo.
                </p>

                <textarea
                  value={draft2}
                  onChange={e => setDraft2(e.target.value)}
                  rows={14}
                  className="w-full bg-slate-950 border border-amber-500/50 text-xs md:text-sm text-white p-3.5 rounded-xl focus:outline-none focus:border-amber-400 font-sans leading-relaxed"
                  placeholder="Nhập nội dung Bản thảo 2 đã được trau chuốt..."
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-medium">
                  {wordCount2 >= wordCount1 ? `+${wordCount2 - wordCount1} từ mở rộng` : `${wordCount2 - wordCount1} từ cô đọng`}
                </span>
                <span className="text-slate-400">Tiêu chuẩn Rubric 4 tiêu chí</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400">
              Hệ thống sẽ đối chiếu cả 2 bản thảo để chấm điểm tiến bộ và đề xuất gợi ý sư phạm.
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {isEvaluating ? 'Đang chấm điểm theo Rubric...' : 'Chấm Điểm & Xuất Phiếu Nghiệm Thu'}
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: RUBRIC SCORECARD & PEDAGOGICAL REPORT */}
      {activeView === 'report' && evaluationReport && (
        <div className="flex flex-col gap-6">
          {/* Top Score Summary Banner */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                KẾT QUẢ ĐÁNH GIÁ THỰC NGHIỆM SƯ PHẠM
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-serif-title">
                Xếp loại: {evaluationReport.gradeCategory}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {evaluationReport.generalAssessment}
              </p>
            </div>

            <div className="flex items-center gap-5 bg-slate-950/80 px-6 py-4 rounded-2xl border border-amber-500/30 text-center">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Tổng Điểm Rubric</span>
                <span className="text-4xl md:text-5xl font-black text-amber-400 font-mono">
                  {evaluationReport.totalScore.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500 font-bold"> / 10.0 điểm</span>
              </div>
            </div>
          </div>

          {/* 4 Criteria Progress Bars & Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RUBRIC_CRITERIA.map((criterion, idx) => {
              let score = 0;
              if (idx === 0) score = evaluationReport.score1;
              if (idx === 1) score = evaluationReport.score2;
              if (idx === 2) score = evaluationReport.score3;
              if (idx === 3) score = evaluationReport.score4;

              const percent = Math.round((score / criterion.maxScore) * 100);
              const critFeedback = evaluationReport.feedbackCriteria?.find(c => c.criterionId === criterion.id);

              return (
                <div key={criterion.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                        Tiêu chí {idx + 1} ({criterion.weightLabel})
                      </span>
                      <span className="text-sm font-bold text-white font-mono">
                        {score.toFixed(1)} / {criterion.maxScore.toFixed(1)}đ
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-serif-title mb-1">
                      {criterion.name}
                    </h4>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden my-2 border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percent >= 80 ? 'bg-emerald-500' : percent >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      {criterion.description}
                    </p>

                    {/* Pros & Formative Improvements */}
                    <div className="space-y-2 text-xs">
                      {critFeedback?.pros && critFeedback.pros.length > 0 && (
                        <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-xl">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
                            ✓ Điểm sáng của bài:
                          </span>
                          <ul className="space-y-1">
                            {critFeedback.pros.map((p, pIdx) => (
                              <li key={pIdx} className="text-emerald-200/90 text-[11px] leading-relaxed flex items-start gap-1">
                                <span>•</span> <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {critFeedback?.improvements && critFeedback.improvements.length > 0 && (
                        <div className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl">
                          <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
                            ⚡ Gợi ý tự tay nâng cấp:
                          </span>
                          <ul className="space-y-1">
                            {critFeedback.improvements.map((imp, iIdx) => (
                              <li key={iIdx} className="text-amber-200/90 text-[11px] leading-relaxed flex items-start gap-1">
                                <span>•</span> <span>{imp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advice From Artisan Bac Ba Lap */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-5 md:p-6 shadow-xl flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 text-3xl shadow-inner">
              👨‍🌾
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-serif-title">Lời Dặn Dò Của Bác Ba Lập</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  Nghệ nhân truyền nghề
                </span>
              </div>
              <p className="text-xs md:text-sm text-amber-100/90 italic leading-relaxed font-sans">
                "{evaluationReport.bacBaLapAdvice}"
              </p>
            </div>
          </div>

          {/* Report Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <button
              onClick={() => setActiveView('editor')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Quay Lại Chỉnh Sửa Bản Thảo
            </button>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Xuất Phiếu Nghiệm Thu Sư Phạm (In / PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
