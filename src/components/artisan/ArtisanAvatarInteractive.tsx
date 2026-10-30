import React, { useState, useEffect } from 'react';
import { speakVietnamese } from '../../utils/vietnameseSpeech.ts';
import {
  Volume2,
  Sparkles,
  Flame,
  Sun,
  Music,
  Smile,
  CheckCircle2,
  Play,
  Square
} from 'lucide-react';

export type ArtisanState = 'idle' | 'speaking' | 'thinking' | 'working';

interface Props {
  state?: ArtisanState;
  onStateChange?: (newState: ArtisanState) => void;
  currentSpeechText?: string;
}

export const ArtisanAvatarInteractive: React.FC<Props> = ({
  state = 'idle',
  onStateChange,
  currentSpeechText
}) => {
  const [activeWorkMode, setActiveWorkMode] = useState<'trang-banh' | 'phoi-banh' | 'don-ca'>('trang-banh');
  const [isSpeakingLocal, setIsSpeakingLocal] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState<string>(
    'Chào cháu nghen! Nhấp vô người bác để nghe bác trò chuyện bằng giọng Nam Bộ mộc mạc!'
  );

  const effectiveState = isSpeakingLocal ? 'speaking' : state;

  const greetings = [
    'Chào cháu nghen! Bác là Ba Lập, giữ nghề tráng bánh Thuận Hưng hơn 50 năm nay rồi!',
    'Cháu lại chơi lò bánh nhà bác đó hả? Nhớ đừng xin bác viết giùm bài thu hoạch nghen, bác chỉ truyền nghề thôi!',
    'Bánh tráng Thuận Hưng mình ngon là nhờ gạo khô cũ xát thấu bột và con nắng sớm liếp tre đó cháu!',
    'Lát nữa làm bài xong, bác đờn cho nghe một khúc Dạ Cổ Hoài Lang bên sông Hậu nghen!'
  ];

  const handleAvatarClick = () => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setSpeechBubbleText(randomGreeting);
    setIsSpeakingLocal(true);

    speakVietnamese(randomGreeting, {
      rate: 0.92,
      onStart: () => setIsSpeakingLocal(true),
      onEnd: () => setIsSpeakingLocal(false),
      onError: () => setIsSpeakingLocal(false)
    });
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Speech Bubble */}
      <div className="w-full mb-3 bg-slate-950/90 border border-amber-500/40 p-3 rounded-2xl shadow-xl relative min-h-[64px] flex items-center justify-between gap-3">
        <p className="text-xs text-amber-200/90 italic font-sans leading-relaxed">
          "{speechBubbleText}"
        </p>
        <button
          onClick={handleAvatarClick}
          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shrink-0 shadow-md cursor-pointer"
          title="Bấm để nghe Bác Ba chào bằng tiếng Việt"
        >
          <Volume2 className="w-4 h-4" />
        </button>

        {/* Speech triangle */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border-r border-b border-amber-500/40 rotate-45" />
      </div>

      {/* Interactive Animated SVG Avatar of Bác Ba Lập */}
      <div
        onClick={handleAvatarClick}
        className="relative w-64 h-64 cursor-pointer group flex items-center justify-center my-2"
        title="Nhấp vào Bác Ba Lập để tương tác"
      >
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="brownShirt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8d5b32" />
              <stop offset="100%" stopColor="#5a381e" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3c8a2" />
              <stop offset="100%" stopColor="#e5a975" />
            </linearGradient>
            <linearGradient id="stoveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Background: Bamboo Drying Rack (Liếp phơi tre) */}
          <g opacity="0.6">
            <line x1="20" y1="210" x2="280" y2="210" stroke="#b45309" strokeWidth="4" />
            <line x1="30" y1="230" x2="270" y2="230" stroke="#b45309" strokeWidth="3" />
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={i}
                x1={30 + i * 14}
                y1="195"
                x2={30 + i * 14}
                y2="245"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
            ))}
            {/* White round rice papers drying on the rack */}
            <circle cx="65" cy="215" r="22" fill="#fffbeb" opacity="0.85" />
            <circle cx="120" cy="215" r="22" fill="#fffbeb" opacity="0.85" />
            <circle cx="235" cy="215" r="22" fill="#fffbeb" opacity="0.85" />
          </g>

          {/* Steaming pot / Lò hơi tráng bánh with rising steam */}
          <g>
            {/* Pot base */}
            <path d="M 180 230 Q 230 230 250 260 L 170 260 Z" fill="url(#stoveGrad)" />
            {/* Boiled water steam particles animated */}
            <g className="animate-pulse">
              <path
                d="M 200 220 Q 195 200 205 180"
                stroke="#fef3c7"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 215 215 Q 225 195 218 175"
                stroke="#fef3c7"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 230 220 Q 225 200 235 185"
                stroke="#fef3c7"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          </g>

          {/* Body: Áo bà ba nâu đất */}
          <path
            d="M 90 280 L 105 190 Q 150 180 195 190 L 210 280 Z"
            fill="url(#brownShirt)"
          />

          {/* Buttons on Áo bà ba */}
          <circle cx="150" cy="210" r="3" fill="#3d2314" />
          <circle cx="150" cy="235" r="3" fill="#3d2314" />
          <circle cx="150" cy="260" r="3" fill="#3d2314" />

          {/* Southern Scarf (Khăn rằn Nam Bộ) draped across neck and shoulders */}
          <path
            d="M 125 185 Q 150 205 175 185 Q 185 240 180 275 L 168 275 Q 170 225 158 200 Q 150 202 142 200 Q 130 225 132 275 L 120 275 Q 115 240 125 185 Z"
            fill="#e2e8f0"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Black & white check lines on Khăn Rằn */}
          <line x1="123" y1="230" x2="135" y2="230" stroke="#0f172a" strokeWidth="2" />
          <line x1="122" y1="250" x2="134" y2="250" stroke="#0f172a" strokeWidth="2" />
          <line x1="166" y1="230" x2="178" y2="230" stroke="#0f172a" strokeWidth="2" />
          <line x1="168" y1="250" x2="180" y2="250" stroke="#0f172a" strokeWidth="2" />

          {/* Neck */}
          <rect x="138" y="155" width="24" height="25" rx="6" fill="url(#skinGrad)" />

          {/* Head & Friendly Southern Face */}
          <ellipse cx="150" cy="130" rx="36" ry="42" fill="url(#skinGrad)" />

          {/* Ears */}
          <ellipse cx="114" cy="132" rx="6" ry="10" fill="url(#skinGrad)" />
          <ellipse cx="186" cy="132" rx="6" ry="10" fill="url(#skinGrad)" />

          {/* Hair: Silver-streaked artisan hair with subtle headband */}
          <path
            d="M 116 120 Q 150 82 184 120 Q 180 95 150 92 Q 120 95 116 120 Z"
            fill="#475569"
          />

          {/* Eyebrows */}
          <path d="M 128 116 Q 137 113 144 116" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 156 116 Q 163 113 172 116" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Eyes (Blinking / smiling) */}
          {effectiveState === 'speaking' ? (
            <g>
              <ellipse cx="136" cy="125" rx="3.5" ry="3.5" fill="#1e293b" />
              <ellipse cx="164" cy="125" rx="3.5" ry="3.5" fill="#1e293b" />
              <circle cx="135" cy="123" r="1.2" fill="#ffffff" />
              <circle cx="163" cy="123" r="1.2" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <path d="M 132 125 Q 136 122 140 125" stroke="#1e293b" strokeWidth="2" fill="none" />
              <path d="M 160 125 Q 164 122 168 125" stroke="#1e293b" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* Wrinkles of wisdom on forehead and eyes */}
          <path d="M 136 102 Q 150 100 164 102" stroke="#d97706" strokeWidth="1" opacity="0.6" fill="none" />
          <path d="M 126 126 L 123 124" stroke="#d97706" strokeWidth="1" opacity="0.6" />
          <path d="M 174 126 L 177 124" stroke="#d97706" strokeWidth="1" opacity="0.6" />

          {/* Nose */}
          <path d="M 150 123 Q 146 136 150 139 Q 154 136 150 123" fill="#d97706" opacity="0.4" />
          <path d="M 145 137 Q 150 142 155 137" stroke="#b45309" strokeWidth="1.5" fill="none" />

          {/* Mouth: Talking vs Smiling */}
          {effectiveState === 'speaking' ? (
            <ellipse cx="150" cy="151" rx="8" ry="6" fill="#881337" className="animate-bounce" />
          ) : (
            <path d="M 141 149 Q 150 156 159 149" stroke="#881337" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Right Hand holding coconut shell ladle (gáo dừa tráng bánh) */}
          <g>
            <path d="M 195 210 Q 220 220 225 240" stroke="url(#skinGrad)" strokeWidth="14" fill="none" strokeLinecap="round" />
            {/* Coconut ladle */}
            <circle cx="225" cy="245" r="10" fill="#451a03" />
            <line x1="210" y1="235" x2="235" y2="250" stroke="#78350f" strokeWidth="3" />
          </g>
        </svg>

        {/* Live Audio Indicator Tag */}
        {effectiveState === 'speaking' && (
          <div className="absolute bottom-2 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
            <Volume2 className="w-3.5 h-3.5" /> Bác Ba đang nói...
          </div>
        )}
      </div>

      {/* Artisan Action Modes Switcher */}
      <div className="w-full mt-2 pt-3 border-t border-slate-800 flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
          Chế độ hoạt cảnh nghệ nhân:
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            onClick={() => {
              setActiveWorkMode('trang-banh');
              const t = 'Bác đang tráng bánh trên nồi hơi vải căng đây nè cháu, tay trở nan tre phải thiệt đều nghen!';
              setSpeechBubbleText(t);
              speakVietnamese(t);
            }}
            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              activeWorkMode === 'trang-banh'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-[10px]">Tráng bánh</span>
          </button>

          <button
            onClick={() => {
              setActiveWorkMode('phoi-banh');
              const t = 'Ra sân canh liếp phơi tre với bác, nắng sớm này phơi bánh là thơm nức mũi luôn!';
              setSpeechBubbleText(t);
              speakVietnamese(t);
            }}
            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              activeWorkMode === 'phoi-banh'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-[10px]">Canh liếp phơi</span>
          </button>

          <button
            onClick={() => {
              setActiveWorkMode('don-ca');
              const t = 'Chiều buông bên bến Ninh Kiều, bác so dây đờn kìm ca khúc tài tử giao duyên nghen!';
              setSpeechBubbleText(t);
              speakVietnamese(t);
            }}
            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              activeWorkMode === 'don-ca'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4 text-amber-400" />
            <span className="text-[10px]">Đờn ca tài tử</span>
          </button>
        </div>
      </div>
    </div>
  );
};
