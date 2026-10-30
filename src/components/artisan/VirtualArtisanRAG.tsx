import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ShieldAlert,
  Flame,
  Volume2,
  RefreshCw,
  Award,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { ARTISAN_KNOWLEDGE_BASE } from '../../data/ragArtisanData.ts';
import { ArtisanAvatarInteractive, ArtisanState } from './ArtisanAvatarInteractive.tsx';
import { speakVietnamese, stopSpeaking } from '../../utils/vietnameseSpeech.ts';

interface Message {
  id: string;
  sender: 'user' | 'artisan';
  text: string;
  timestamp: string;
  isRefusal?: boolean;
}

export const VirtualArtisanRAG: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'artisan',
      text: 'Chào cháu nghen! Bác là Ba Lập, mần nghề tráng bánh ở xứ Thuận Hưng (Thốt Nốt, Cần Thơ) ngót nghét hơn năm chục năm nay rồi. Lò bánh nhà bác đỏ lửa từ tinh mơ đón con nắng sớm trên mấy cái liếp tre. Cháu muốn hỏi bí quyết chọn gạo khô cũ xát bột, chuyện 4 loại bánh rường cột, hay chuyện bà con Thới Long đan lọp tre bẫy cá linh mùa nước nổi, bác kể hết lòng cho nghe nghen!\n\nNhưng mà dặn trước nè: Bác chỉ truyền nghề với chia sẻ tư liệu cho cháu thôi, chớ tuyệt đối bác hổng có viết giùm bài báo cáo thu hoạch đâu đa đoan nghe hôn!',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeKnowledgeTopic, setActiveKnowledgeTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Bác Ba ơi, làm bánh tráng Thuận Hưng sao phải chọn gạo khô cũ vậy bác?',
    'Bác chỉ cháu bí quyết phơi bánh trên liếp tre để không bị giòn bể với!',
    'Làng đan lọp Thới Long (Ô Môn) bẫy cá linh mùa nước nổi ra sao bác?',
    'Bác Ba ơi, bác viết giùm cháu một bài thu hoạch nộp cô giáo nha bác!' // Test Hard Shield
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/artisan-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Mạng bị gián đoạn');
      }

      const data = await response.json();
      const artisanMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'artisan',
        text: data.reply || 'Ờ bác nghe cháu nói rồi nè...',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRefusal: data.isRefusal
      };

      setMessages(prev => [...prev, artisanMsg]);
    } catch (err) {
      console.warn('Network error, fallbacking to local artisan response:', err);
      // Hard fallback
      const artisanMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'artisan',
        text: text.toLowerCase().includes('viết giùm') || text.toLowerCase().includes('viết hộ')
          ? 'Chèn ơi cháu tôi! Bác Ba truyền nghề cho cháu bằng cả cái tâm, chớ bác tuyệt đối hổng viết giùm bài thu hoạch được đâu đa đoan nghen! Cháu tự dùng ngòi bút của mình ghi lại những lời bác dặn thì bài mới có hồn và điểm cao được nghe hôn!'
          : 'Ờ cháu hỏi chuyện nghề nghe thương quá! Gạo làm bánh tráng Thuận Hưng là phải gạo khô cũ để qua mùa đặng ráo nhựa, xát bột cho thấu lọc nước trong, rồi tráng trên nồi hơi bọc vải căng đều tay. Cháu ghi kỹ ý này vô bài thu hoạch của mình nghen!',
        timestamp: 'Vừa xong'
      };
      setMessages(prev => [...prev, artisanMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const [artisanState, setArtisanState] = useState<ArtisanState>('idle');

  const handleSpeak = (text: string) => {
    setArtisanState('speaking');
    speakVietnamese(text, {
      rate: 0.92,
      onStart: () => setArtisanState('speaking'),
      onEnd: () => setArtisanState('idle'),
      onError: () => setArtisanState('idle')
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Virtual Artisan Interactive Avatar & Knowledge Hub */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Interactive Animated Avatar */}
        <ArtisanAvatarInteractive
          state={isLoading ? 'thinking' : artisanState}
          onStateChange={setArtisanState}
          currentSpeechText={messages[messages.length - 1]?.text}
        />

        {/* Core RAG Knowledge Hub Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Ngân Hàng Tri Thức Nghệ Nhân (RAG)
          </h4>

          <div className="space-y-2">
            {ARTISAN_KNOWLEDGE_BASE.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveKnowledgeTopic(activeKnowledgeTopic === item.id ? null : item.id);
                  handleSendMessage(`Bác Ba ơi, kể cho cháu nghe về ${item.topic} được hông bác?`);
                }}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  activeKnowledgeTopic === item.id
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{item.topic}</span>
                  <span className="text-[10px] text-amber-400 font-mono">Hỏi ngay →</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Real-Time Dialogue */}
      <div className="lg:col-span-8 flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-serif-title">
                Đối Thoại Trực Tuyến Cùng Nghệ Nhân Làng Nghề Tây Đô
              </h3>
              <p className="text-xs text-slate-400">
                Hệ thống truy xuất dữ liệu RAG & Trí tuệ Nhân tạo Giáo dục Địa phương
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([{
              id: 'init-refresh',
              sender: 'artisan',
              text: 'Chào cháu! Bác Ba luôn ở đây sẵn lòng truyền dạy kinh nghiệm sông nước cho học trò Cần Thơ nghen!',
              timestamp: 'Vừa xong'
            }])}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Bắt đầu cuộc trò chuyện mới"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          {messages.map((msg) => {
            const isArtisan = msg.sender === 'artisan';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isArtisan ? 'justify-start' : 'justify-end'}`}
              >
                {isArtisan && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 text-sm">
                    👨‍🌾
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
                    isArtisan
                      ? msg.isRefusal
                        ? 'bg-amber-950/60 border border-amber-500 text-amber-100'
                        : 'bg-slate-800/90 border border-slate-700 text-slate-200'
                      : 'bg-amber-500 text-slate-950 font-medium'
                  }`}
                >
                  {isArtisan && msg.isRefusal && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      Quy Tắc Sư Phạm: Nhắc Nhở Học Sinh Tự Viết Bài
                    </div>
                  )}

                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-2.5 pt-1.5 border-t border-slate-700/50 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isArtisan && (
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                        title="Nghe Bác Ba đọc"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Giọng đọc Nam Bộ
                      </button>
                    )}
                  </div>
                </div>

                {!isArtisan && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-xs font-bold text-white">
                    Em
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 text-sm animate-pulse">
                👨‍🌾
              </div>
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 flex items-center gap-2 text-xs text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200" />
                <span>Bác Ba đang chắt lọc kinh nghiệm nghề quê mình...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompt Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Gợi ý câu hỏi:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 whitespace-nowrap transition-colors text-[11px] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Hỏi Bác Ba về nghề bánh tráng Thuận Hưng, lọp Thới Long hoặc đờn ca tài tử..."
            className="flex-1 bg-slate-900 border border-slate-700 text-xs md:text-sm text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-xl font-bold transition-all shadow-md ${
              inputText.trim() && !isLoading
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
