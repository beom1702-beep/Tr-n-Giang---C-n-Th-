import React from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogicalModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Thực Nghiệm Sư Phạm
              </span>
              <span className="text-xs text-slate-400">Đề tài KHCN Giáo dục Cần Thơ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-serif-title">
              Báo Cáo Thực Nghiệm 12 Tuần Trên 274 Học Sinh THCS Quận Ninh Kiều
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-2xl font-black text-white font-mono">274</span>
            <span className="text-xs text-slate-400 block mt-0.5">Học sinh khối 8 & 9 Ninh Kiều</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-2xl font-black text-emerald-400 font-mono">+38.6%</span>
            <span className="text-xs text-slate-400 block mt-0.5">Mức độ tiến bộ điểm Rubric</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <Award className="w-5 h-5 text-sky-400 mx-auto mb-1" />
            <span className="text-2xl font-black text-sky-400 font-mono">94.2%</span>
            <span className="text-xs text-slate-400 block mt-0.5">Giảm lỗi chính tả phương ngữ</span>
          </div>
        </div>

        {/* Core Pedagogical Findings */}
        <div className="space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Chu trình sư phạm khép kín 3 phân hệ đã kiểm chứng:
          </h4>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-white block">1. Khám phá không gian học liệu 3D và RAG tri thức:</strong>
            <p className="text-slate-400 text-xs">
              Học sinh tương tác trực quan với sa bàn Đạo Trấn Giang 1739, Hạt Cần Thơ 1876, Chi bộ Cờ Đỏ 1929, Lộ Vòng Cung 1968 và trò chuyện với Bác Ba Lập để khắc sâu kiến thức di sản.
            </p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-white block">2. Thực địa trạm Ninh Kiều với Phiếu nhiệm vụ QR:</strong>
            <p className="text-slate-400 text-xs">
              Học sinh đến Bảo tàng Cần Thơ, Chợ cổ 1915 và bờ kè Ninh Kiều để thu thập số liệu thực tế (mật độ 10.005 người/km², đo triều cường, phân loại rác) thay vì chỉ học chay.
            </p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-white block">3. Trợ lý Rubric với Khóa Prompt Cứng (Hard Prompt Shield):</strong>
            <p className="text-slate-400 text-xs">
              Tuyệt đối từ chối tạo văn mẫu viết hộ. Học sinh đối chiếu Bản thảo 1 và Bản thảo 2, nhận lời khuyên của Bác Ba Lập để tự mình hoàn thiện sản phẩm học tập.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          Đã Hiểu & Tiếp Tục Học Tập
        </button>
      </div>
    </div>
  );
};
