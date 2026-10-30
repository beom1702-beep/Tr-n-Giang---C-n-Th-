import React, { useState } from 'react';
import { HistoricalEra } from '../../data/historyData.ts';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  ShieldCheck,
  MapPin,
  HelpCircle,
  FileText,
  Volume2
} from 'lucide-react';
import { speakVietnamese } from '../../utils/vietnameseSpeech.ts';

interface Props {
  era: HistoricalEra;
  onClose?: () => void;
  onEarnBadge?: (eraId: string) => void;
}

export const EraDetailDrawer: React.FC<Props> = ({ era, onClose, onEarnBadge }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);

  const isCorrect = selectedAnswer === era.quizQuestion.correctIndex;

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setHasSubmittedQuiz(true);
    if (selectedAnswer === era.quizQuestion.correctIndex && onEarnBadge) {
      onEarnBadge(era.id);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setHasSubmittedQuiz(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {era.yearLabel}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {era.badge}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {era.gradeLevel}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-serif-title">
            {era.name}: {era.subtitle}
          </h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" /> {era.location}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <button
            onClick={() => speakVietnamese(`${era.name}. ${era.subtitle}. ${era.summary}. ${era.historicalContext}`)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            title="Nghe giọng đọc thuyết minh lịch sử tiếng Việt"
          >
            <Volume2 className="w-3.5 h-3.5" /> Nghe giọng Việt
          </button>

          <div className="text-right text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="block font-semibold text-slate-200">Mã chương trình:</span>
            <span>{era.sgkReference}</span>
          </div>
        </div>
      </div>

      {/* Main Content & Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4" /> Tổng quan lịch sử
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">{era.summary}</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5 mb-2">
              <FileText className="w-4 h-4" /> Bối cảnh mở đất & Chiến lược
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{era.historicalContext}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Key Artifacts */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
              <ShieldCheck className="w-4 h-4" /> Hiện vật & Dấu tích lưu trữ tại Cần Thơ
            </h4>
            <ul className="space-y-2">
              {era.keyArtifacts.map((art, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{art}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fieldwork Prompt */}
          <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-4 h-4" /> Gợi ý nhiệm vụ điền dã thực tế
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed italic">
              "{era.fieldworkPrompt}"
            </p>
          </div>
        </div>
      </div>

      {/* Formative Quick Quiz for Active Learning */}
      <div className="mt-2 bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Thử thách củng cố kiến thức (Môn GDĐP Cần Thơ)
            </h4>
          </div>
          {hasSubmittedQuiz && isCorrect && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-semibold">
              <Award className="w-3.5 h-3.5" /> +10 Điểm Di Sản
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-slate-200 mb-3">
          {era.quizQuestion.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {era.quizQuestion.options.map((option, idx) => {
            const isChosen = selectedAnswer === idx;
            let btnClass = 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white';

            if (hasSubmittedQuiz) {
              if (idx === era.quizQuestion.correctIndex) {
                btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isChosen) {
                btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500';
              }
            } else if (isChosen) {
              btnClass = 'bg-amber-500/20 border-amber-500 text-white font-semibold';
            }

            return (
              <button
                key={idx}
                disabled={hasSubmittedQuiz}
                onClick={() => setSelectedAnswer(idx)}
                className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnClass}`}
              >
                <span>{option}</span>
                {hasSubmittedQuiz && idx === era.quizQuestion.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {hasSubmittedQuiz && isChosen && idx !== era.quizQuestion.correctIndex && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {!hasSubmittedQuiz ? (
          <button
            disabled={selectedAnswer === null}
            onClick={handleQuizSubmit}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedAnswer !== null
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-lg'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Xác nhận câu trả lời <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <p className="text-xs text-slate-300">
              <span className="font-bold text-amber-400">Giải thích: </span>
              {era.quizQuestion.explanation}
            </p>
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer shrink-0"
            >
              Làm lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
