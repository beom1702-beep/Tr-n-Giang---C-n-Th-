import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  MapPin,
  Award,
  Sparkles,
  Users,
  Layers,
  FileCheck,
  Flame,
  CheckCircle2,
  GraduationCap,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { HISTORICAL_ERAS, HistoricalEra } from './data/historyData.ts';
import { CanThoReliefMap3D } from './components/history3d/CanThoReliefMap3D.tsx';
import { EraDetailDrawer } from './components/history3d/EraDetailDrawer.tsx';
import { DialectExplorer } from './components/dialect/DialectExplorer.tsx';
import { VirtualArtisanRAG } from './components/artisan/VirtualArtisanRAG.tsx';
import { HeritageStations } from './components/heritage/HeritageStations.tsx';
import { HeritageProgressCircularChart } from './components/heritage/HeritageProgressCircularChart.tsx';
import { RubricEvaluationAssistant } from './components/rubric/RubricEvaluationAssistant.tsx';
import { PedagogicalModal } from './components/common/PedagogicalModal.tsx';

type MainTab = 'subsystem-1-3d' | 'subsystem-1-dialect' | 'subsystem-1-artisan' | 'subsystem-2-stations' | 'subsystem-3-rubric';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('subsystem-1-3d');
  const [selectedEraId, setSelectedEraId] = useState<string>('tran-giang-1739');
  const [isPedagogicalModalOpen, setIsPedagogicalModalOpen] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['tran-giang-1739']);
  const [heritagePoints, setHeritagePoints] = useState<number>(45);
  const [completedHeritageStations, setCompletedHeritageStations] = useState<string[]>(['station-bao-tang']);

  const selectedEra = HISTORICAL_ERAS.find(e => e.id === selectedEraId) || HISTORICAL_ERAS[0];

  const handleEarnBadge = (eraId: string) => {
    if (!earnedBadges.includes(eraId)) {
      setEarnedBadges(prev => [...prev, eraId]);
      setHeritagePoints(prev => prev + 15);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c121e] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header & Navigation */}
      <header className="sticky top-0 z-40 bg-[#0c121e]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <span className="font-serif-title font-black text-slate-950 text-xl">TĐ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-black tracking-tight text-white font-serif-title">
                  TÂY ĐÔ SỐ
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  GDĐP Cần Thơ THCS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Không gian học liệu số 3D WebGL & Trợ lý Sư phạm AI Khối 8-9
              </p>
            </div>
          </div>

          {/* Badges & Empirical Research Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPedagogicalModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-amber-300 border border-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Thực nghiệm 12 tuần (274 HS)</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{heritagePoints} Điểm Di Sản</span>
            </div>
          </div>
        </div>

        {/* Global Subsystem Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-x-auto">
          <nav className="flex items-center gap-1 py-2 text-xs font-bold whitespace-nowrap">
            <button
              onClick={() => setActiveTab('subsystem-1-3d')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subsystem-1-3d'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Phân Hệ 1: Sa Bàn 3D Lịch Sử
            </button>

            <button
              onClick={() => setActiveTab('subsystem-1-dialect')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subsystem-1-dialect'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Thẻ Phương Ngữ 3D & Chính Tả
            </button>

            <button
              onClick={() => setActiveTab('subsystem-1-artisan')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subsystem-1-artisan'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Flame className="w-4 h-4" />
              Nghệ Nhân Ảo RAG: Bác Ba Lập
            </button>

            <button
              onClick={() => setActiveTab('subsystem-2-stations')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subsystem-2-stations'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Phân Hệ 2: Trạm Ninh Kiều & Phiếu QR
            </button>

            <button
              onClick={() => setActiveTab('subsystem-3-rubric')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subsystem-3-rubric'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Phân Hệ 3: Trợ Lý Rubric 4 Tiêu Chí
            </button>
          </nav>
        </div>
      </header>

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-8">
        {/* TAB 1: 3D HISTORICAL RELIEF MAP */}
        {activeTab === 'subsystem-1-3d' && (
          <div className="flex flex-col gap-6">
            <CanThoReliefMap3D
              selectedEraId={selectedEraId}
              onSelectEra={(era) => setSelectedEraId(era.id)}
            />

            {/* Selected Era Detail & Active Learning Formative Quiz */}
            <EraDetailDrawer
              era={selectedEra}
              onEarnBadge={handleEarnBadge}
            />
          </div>
        )}

        {/* TAB 2: 3D DIALECT FLASHCARDS & SPELLCHECKER */}
        {activeTab === 'subsystem-1-dialect' && (
          <DialectExplorer />
        )}

        {/* TAB 3: VIRTUAL ARTISAN RAG (BÁC BA LẬP) */}
        {activeTab === 'subsystem-1-artisan' && (
          <VirtualArtisanRAG />
        )}

        {/* TAB 4: HERITAGE STATIONS & FIELDWORK QR */}
        {activeTab === 'subsystem-2-stations' && (
          <HeritageStations
            onUpdateCompletedStations={(stations) => setCompletedHeritageStations(stations)}
          />
        )}

        {/* TAB 5: RUBRIC 4-CRITERIA EVALUATION ASSISTANT */}
        {activeTab === 'subsystem-3-rubric' && (
          <RubricEvaluationAssistant />
        )}
      </main>

      {/* Circular Completion Chart for Ninh Kieu Heritage Stations (Pinned Bottom Corner) */}
      <HeritageProgressCircularChart
        completedStations={completedHeritageStations}
        totalStations={3}
        onNavigateToHeritageTab={() => setActiveTab('subsystem-2-stations')}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-bold text-slate-300">Tây Đô Số</span>
            <span>•</span>
            <span>Nền tảng học liệu tương tác 3D WebGL môn Giáo dục địa phương Cần Thơ</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPedagogicalModalOpen(true)}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Dữ liệu thực nghiệm 274 học sinh
            </button>
            <span>•</span>
            <span>Quận Ninh Kiều, TP. Cần Thơ</span>
          </div>
        </div>
      </footer>

      {/* Empirical Modal */}
      <PedagogicalModal
        isOpen={isPedagogicalModalOpen}
        onClose={() => setIsPedagogicalModalOpen(false)}
      />
    </div>
  );
}
