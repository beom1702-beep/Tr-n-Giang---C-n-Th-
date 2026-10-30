import React, { useState } from 'react';
import { CheckCircle2, ChevronUp, ChevronDown, MapPin, Award, ExternalLink } from 'lucide-react';
import { HERITAGE_STATIONS } from '../../data/heritageStationsData.ts';

interface Props {
  completedStations: string[];
  totalStations?: number;
  onSelectStation?: (stationId: string) => void;
  onNavigateToHeritageTab?: () => void;
}

export const HeritageProgressCircularChart: React.FC<Props> = ({
  completedStations,
  totalStations = 3,
  onSelectStation,
  onNavigateToHeritageTab
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = completedStations.length;
  const percentage = Math.round((completedCount / totalStations) * 100);

  // SVG circular geometry
  const radius = 34;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none print:hidden">
      <div className="flex flex-col items-end gap-2">
        {/* Expanded Drawer showing station breakdown */}
        {isExpanded && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-4 shadow-2xl w-72 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Tiến Độ Khảo Sát Ninh Kiều
              </span>
              <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                {completedCount}/{totalStations} Trạm
              </span>
            </div>

            <div className="space-y-2">
              {HERITAGE_STATIONS.map((station) => {
                const isDone = completedStations.includes(station.id);
                return (
                  <div
                    key={station.id}
                    onClick={() => {
                      if (onSelectStation) onSelectStation(station.id);
                      if (onNavigateToHeritageTab) onNavigateToHeritageTab();
                    }}
                    className={`p-2 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className={`w-3.5 h-3.5 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div className="truncate">
                        <span className="font-bold text-[11px] block truncate">{station.name}</span>
                        <span className="font-mono text-[9px] text-slate-500">{station.stationCode}</span>
                      </div>
                    </div>

                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                    ) : (
                      <span className="text-[10px] text-amber-400/80 shrink-0 font-medium">Chưa xong</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Định chuẩn thực nghiệm THCS</span>
              {onNavigateToHeritageTab && (
                <button
                  onClick={onNavigateToHeritageTab}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Mở Trạm <ExternalLink className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Floating Donut Button Widget */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-slate-900/95 backdrop-blur-md border border-amber-500/50 hover:border-amber-400 rounded-full p-2 pl-3.5 pr-2.5 shadow-2xl flex items-center gap-3 cursor-pointer transition-all hover:scale-105 group"
          title="Nhấp để xem chi tiết tiến độ hoàn thành các trạm di sản"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Trạm Di Sản
            </span>
            <span className="text-xs font-black text-amber-400 font-mono">
              {completedCount}/{totalStations} Trạm ({percentage}%)
            </span>
          </div>

          {/* Custom SVG Donut Chart */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90">
              {/* Background ring */}
              <circle
                cx="32"
                cy="32"
                r={radius - 7}
                className="stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="32"
                cy="32"
                r={radius - 7}
                stroke={percentage === 100 ? '#10b981' : percentage > 0 ? '#f59e0b' : '#64748b'}
                strokeWidth={strokeWidth}
                strokeDasharray={2 * Math.PI * (radius - 7)}
                strokeDashoffset={
                  2 * Math.PI * (radius - 7) -
                  (percentage / 100) * 2 * Math.PI * (radius - 7)
                }
                strokeLinecap="round"
                fill="none"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>

            {/* Inner Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-white">
              {percentage}%
            </div>
          </div>

          <div className="text-slate-400 group-hover:text-amber-400 transition-colors p-1">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};
