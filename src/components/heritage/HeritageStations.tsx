import React, { useState } from 'react';
import {
  HERITAGE_STATIONS,
  HeritageStation
} from '../../data/heritageStationsData.ts';
import { speakVietnamese } from '../../utils/vietnameseSpeech.ts';
import {
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  Camera,
  Upload,
  Printer,
  Sparkles,
  BarChart3,
  Award,
  AlertCircle,
  Clock,
  ArrowRight,
  Droplets,
  Layers,
  Image as ImageIcon,
  Volume2,
  Maximize2,
  X,
  Plus,
  Trash2,
  Link as LinkIcon,
  RefreshCw,
  Edit3,
  Check,
  UploadCloud,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StationProgress {
  answers: Record<string, string>;
  photos: Record<string, string>;
  isCompleted: boolean;
  completedAt?: string;
}

export interface GalleryPhoto {
  title: string;
  subtitle: string;
  url: string;
  description: string;
  isPrimary?: boolean;
  isCustom?: boolean;
}

interface Props {
  onUpdateCompletedStations?: (stations: string[]) => void;
}

export const HeritageStations: React.FC<Props> = ({ onUpdateCompletedStations }) => {
  const [selectedStationId, setSelectedStationId] = useState<string>('station-bao-tang');
  const [stationProgress, setStationProgress] = useState<Record<string, StationProgress>>({
    'station-bao-tang': { answers: {}, photos: {}, isCompleted: false },
    'station-cho-co': { answers: {}, photos: {}, isCompleted: false },
    'station-do-thi-moi-truong': { answers: {}, photos: {}, isCompleted: false },
  });
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<{ url: string; title: string; desc: string } | null>(null);
  const [simulatedWaterLevel, setSimulatedWaterLevel] = useState<number>(2.15);

  // User-customizable galleries per station (persisted in localStorage)
  const [stationGalleries, setStationGalleries] = useState<Record<string, GalleryPhoto[]>>(() => {
    try {
      const saved = localStorage.getItem('taydoso_station_galleries');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    const initial: Record<string, GalleryPhoto[]> = {};
    HERITAGE_STATIONS.forEach((s) => {
      initial[s.id] = (s.galleryImages || []).map((img, idx) => ({
        ...img,
        isPrimary: idx === 0,
        isCustom: false,
      }));
    });
    return initial;
  });

  // Modal state for adding or editing images
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [photoUploadTab, setPhotoUploadTab] = useState<'upload' | 'url'>('upload');
  const [inputPhotoUrl, setInputPhotoUrl] = useState('');
  const [inputPhotoTitle, setInputPhotoTitle] = useState('');
  const [inputPhotoSubtitle, setInputPhotoSubtitle] = useState('');
  const [inputPhotoDesc, setInputPhotoDesc] = useState('');
  const [inputIsPrimary, setInputIsPrimary] = useState(false);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Helper to persist galleries
  const saveGalleries = (updated: Record<string, GalleryPhoto[]>) => {
    setStationGalleries(updated);
    try {
      localStorage.setItem('taydoso_station_galleries', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  const currentStation = HERITAGE_STATIONS.find(s => s.id === selectedStationId) || HERITAGE_STATIONS[0];
  const currentProgress = stationProgress[currentStation.id] || { answers: {}, photos: {}, isCompleted: false };

  const handleAnswerChange = (taskId: string, val: string) => {
    setStationProgress(prev => ({
      ...prev,
      [currentStation.id]: {
        ...prev[currentStation.id],
        answers: {
          ...prev[currentStation.id]?.answers,
          [taskId]: val
        }
      }
    }));
  };

  const handleSimulatePhoto = (taskId: string) => {
    // Generate a contextual SVG data URL placeholder for field evidence
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 400, 300);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`[ẢNH MINH CHỨNG KHẢO SÁT]`, 20, 40);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Trạm: ${currentStation.name}`, 20, 75);
    ctx.fillText(`Mã: ${currentStation.stationCode}`, 20, 100);
    ctx.fillText(`Thời gian: ${new Date().toLocaleString('vi-VN')}`, 20, 125);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Tọa độ: Ninh Kiều, Cần Thơ`, 20, 150);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 380, 280);

    const dataUrl = canvas.toDataURL('image/png');

    setStationProgress(prev => ({
      ...prev,
      [currentStation.id]: {
        ...prev[currentStation.id],
        photos: {
          ...prev[currentStation.id]?.photos,
          [taskId]: dataUrl
        }
      }
    }));
  };

  const handleSubmitStation = () => {
    const updated = {
      ...stationProgress,
      [currentStation.id]: {
        ...stationProgress[currentStation.id],
        isCompleted: true,
        completedAt: new Date().toLocaleTimeString('vi-VN')
      }
    };
    setStationProgress(updated);

    const completedIds = Object.keys(updated).filter(id => updated[id].isCompleted);
    if (onUpdateCompletedStations) {
      onUpdateCompletedStations(completedIds);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCodeSubmit = () => {
    const found = HERITAGE_STATIONS.find(
      s => s.stationCode.toLowerCase() === manualCodeInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedStationId(found.id);
      setManualCodeInput('');
    } else {
      alert(`Không tìm thấy mã trạm "${manualCodeInput}". Vui lòng thử lại với mã: NK-BT01, NK-CC02, hoặc NK-MT03.`);
    }
  };

  // Current active gallery for this station
  const currentGallery = stationGalleries[currentStation.id] || [];

  const handleOpenAddModal = () => {
    setEditingPhotoIndex(null);
    setInputPhotoUrl('');
    setInputPhotoTitle(currentStation.name);
    setInputPhotoSubtitle(currentStation.address);
    setInputPhotoDesc('Ảnh tư liệu thực tế do học sinh / giáo viên thu thập tại quận Ninh Kiều, Cần Thơ.');
    setInputIsPrimary(false);
    setUploadPreview(null);
    setUploadError(null);
    setPhotoUploadTab('upload');
    setShowPhotoUploadModal(true);
  };

  const handleOpenEditModal = (index: number) => {
    const photo = currentGallery[index];
    if (!photo) return;
    setEditingPhotoIndex(index);
    setInputPhotoUrl(photo.url);
    setInputPhotoTitle(photo.title);
    setInputPhotoSubtitle(photo.subtitle);
    setInputPhotoDesc(photo.description);
    setInputIsPrimary(photo.isPrimary || false);
    setUploadPreview(photo.url);
    setUploadError(null);
    setPhotoUploadTab(photo.url.startsWith('data:') ? 'upload' : 'url');
    setShowPhotoUploadModal(true);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Vui lòng chọn một tệp hình ảnh hợp lệ (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Kích thước ảnh tối đa 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadPreview(result);
    };
    reader.onerror = () => {
      setUploadError('Không thể đọc tệp ảnh. Vui lòng thử lại.');
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = () => {
    const finalUrl = photoUploadTab === 'upload' ? uploadPreview : inputPhotoUrl.trim();
    if (!finalUrl) {
      setUploadError('Vui lòng tải lên một tệp ảnh hoặc dán đường link URL hình ảnh.');
      return;
    }

    const newPhoto: GalleryPhoto = {
      title: inputPhotoTitle.trim() || `${currentStation.name} (Ảnh thực tế)`,
      subtitle: inputPhotoSubtitle.trim() || currentStation.address,
      url: finalUrl,
      description: inputPhotoDesc.trim() || 'Hình ảnh khảo sát thực tế tại Ninh Kiều, Cần Thơ.',
      isPrimary: inputIsPrimary,
      isCustom: true,
    };

    let updatedList = [...currentGallery];

    if (editingPhotoIndex !== null) {
      // Update existing photo
      updatedList[editingPhotoIndex] = newPhoto;
    } else {
      // Prepend or append new photo
      if (inputIsPrimary) {
        updatedList.forEach(p => (p.isPrimary = false));
        updatedList.unshift(newPhoto);
      } else {
        updatedList.push(newPhoto);
      }
    }

    // If marked primary, ensure it is first and other isPrimary flags are cleared
    if (inputIsPrimary) {
      updatedList = updatedList.map((p, idx) => ({
        ...p,
        isPrimary: idx === 0,
      }));
    }

    const updatedAll = {
      ...stationGalleries,
      [currentStation.id]: updatedList,
    };
    saveGalleries(updatedAll);
    setShowPhotoUploadModal(false);
  };

  const handleDeletePhoto = (index: number) => {
    if (currentGallery.length <= 1) {
      alert('Mỗi trạm cần giữ ít nhất 1 hình ảnh đại diện.');
      return;
    }
    if (confirm('Cháu có chắc muốn xóa ảnh này khỏi bộ sưu tập trạm không?')) {
      const updatedList = currentGallery.filter((_, idx) => idx !== index);
      if (updatedList.length > 0 && !updatedList.some(p => p.isPrimary)) {
        updatedList[0].isPrimary = true;
      }
      const updatedAll = {
        ...stationGalleries,
        [currentStation.id]: updatedList,
      };
      saveGalleries(updatedAll);
    }
  };

  const handleSetPrimaryPhoto = (index: number) => {
    const photo = currentGallery[index];
    if (!photo) return;
    const remaining = currentGallery.filter((_, idx) => idx !== index);
    const updatedList = [
      { ...photo, isPrimary: true },
      ...remaining.map(p => ({ ...p, isPrimary: false })),
    ];
    const updatedAll = {
      ...stationGalleries,
      [currentStation.id]: updatedList,
    };
    saveGalleries(updatedAll);
  };

  const handleResetStationGallery = () => {
    if (confirm(`Khôi phục bộ ảnh mẫu ban đầu của trạm "${currentStation.name}"?`)) {
      const defaultPhotos = (currentStation.galleryImages || []).map((img, idx) => ({
        ...img,
        isPrimary: idx === 0,
        isCustom: false,
      }));
      const updatedAll = {
        ...stationGalleries,
        [currentStation.id]: defaultPhotos,
      };
      saveGalleries(updatedAll);
    }
  };

  const completedCount = Object.values(stationProgress).filter(p => p.isCompleted).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Station Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="md:col-span-8 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Phân Hệ 2
            </span>
            <span className="text-xs text-slate-400">
              Dự án Thực nghiệm Sư phạm 12 tuần / 274 học sinh THCS Ninh Kiều
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white font-serif-title">
            Trạm Di Sản & Khảo Sát Đô Thị Ninh Kiều (Phiếu Nhiệm Vụ QR)
          </h2>
        </div>

        {/* Manual Station Code Input & Progress Status */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <input
              type="text"
              value={manualCodeInput}
              onChange={e => setManualCodeInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()}
              placeholder="Nhập mã QR trạm..."
              className="bg-transparent text-xs text-white px-2 py-1 w-28 uppercase font-mono focus:outline-none"
            />
            <button
              onClick={handleCodeSubmit}
              className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
            >
              Vào trạm
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Hoàn thành:</span>
            <span className="text-xs font-bold text-emerald-400">{completedCount}/3 trạm</span>
          </div>
        </div>
      </div>

      {/* 3 Stations Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HERITAGE_STATIONS.map((station) => {
          const isSelected = station.id === selectedStationId;
          const isDone = stationProgress[station.id]?.isCompleted;
          return (
            <div
              key={station.id}
              onClick={() => setSelectedStationId(station.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {station.stationCode}
                  </span>
                  {isDone ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã nghiệm thu
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Chưa nộp minh chứng</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white font-serif-title mb-1">
                  {station.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {station.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-amber-500" /> {station.badge}
                </span>
                <span className="text-amber-400 font-medium flex items-center gap-0.5">
                  Chi tiết <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Station Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Station Overview & QR Code Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {currentStation.stationCode} • {currentStation.badge}
                </span>
                <h3 className="text-xl font-bold text-white font-serif-title mt-0.5">
                  {currentStation.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> {currentStation.address}
                </p>
              </div>

              {/* Dynamic QR Code Badge */}
              <button
                onClick={() => setShowQRModal(true)}
                className="p-3 bg-white rounded-xl text-slate-950 flex flex-col items-center gap-1 shadow-md hover:bg-amber-100 transition-colors"
                title="Bấm để phóng to mã QR điền dã"
              >
                <QrCode className="w-8 h-8" />
                <span className="text-[9px] font-mono font-bold uppercase">Quét QR</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" /> Thuyết minh audio (Tiếng Việt)
                </span>
                <button
                  onClick={() => speakVietnamese(`${currentStation.name}. Địa chỉ: ${currentStation.address}. ${currentStation.summary}`)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe giọng Việt
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStation.summary}
              </p>
            </div>

            {/* Authentic Photographic Gallery of Ninh Kieu (Can Tho, Vietnam) - Fully User Customizable */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    Hình Ảnh Thực Tế Trạm Ninh Kiều (Cần Thơ)
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Tự tải ảnh thực tế lên hoặc dán đường link ảnh tùy thích
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleOpenAddModal}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                    title="Tự tải ảnh lên từ thiết bị hoặc dán link ảnh mới"
                  >
                    <Plus className="w-3.5 h-3.5" /> Chèn / Link Ảnh
                  </button>

                  <button
                    onClick={handleResetStationGallery}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Khôi phục bộ ảnh mẫu mặc định của trạm"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {currentGallery.length > 0 ? (
                <>
                  {/* Primary Hero Image */}
                  <div className="relative h-48 rounded-xl overflow-hidden border border-amber-500/40 group shadow-lg bg-slate-950">
                    <img
                      src={currentGallery[0].url}
                      alt={currentGallery[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback image if user provided broken URL
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    {/* Overlay controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold">
                            Ảnh chính
                          </span>
                          {currentGallery[0].isCustom && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                              Đã tự tải lên / chèn link
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEditModal(0)}
                            className="p-1.5 rounded-lg bg-slate-900/90 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                            title="Thay thế hoặc chỉnh sửa thông tin ảnh này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {currentGallery.length > 1 && (
                            <button
                              onClick={() => handleDeletePhoto(0)}
                              className="p-1.5 rounded-lg bg-slate-900/90 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                              title="Xóa ảnh này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              setActivePhotoLightbox({
                                url: currentGallery[0].url,
                                title: currentGallery[0].title,
                                desc: currentGallery[0].description,
                              })
                            }
                            className="p-1.5 rounded-lg bg-slate-900/90 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors"
                            title="Phóng to ảnh"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs md:text-sm font-bold text-white drop-shadow">
                          {currentGallery[0].title}
                        </h5>
                        <p className="text-[10px] text-slate-300 line-clamp-1">
                          {currentGallery[0].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Image Thumbnails Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {currentGallery.slice(1).map((img, iIdx) => {
                      const actualIndex = iIdx + 1;
                      return (
                        <div
                          key={actualIndex}
                          className="relative h-24 rounded-lg overflow-hidden border border-slate-800 group bg-slate-950"
                        >
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-colors p-1.5 flex flex-col justify-between">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleSetPrimaryPhoto(actualIndex)}
                                className="p-1 rounded bg-slate-900/90 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                                title="Đặt làm ảnh chính"
                              >
                                <Star className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(actualIndex)}
                                className="p-1 rounded bg-slate-900/90 text-amber-300 hover:bg-amber-500 hover:text-slate-950"
                                title="Sửa thông tin"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeletePhoto(actualIndex)}
                                className="p-1 rounded bg-slate-900/90 text-rose-400 hover:bg-rose-500 hover:text-white"
                                title="Xóa ảnh"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>

                            <div
                              onClick={() =>
                                setActivePhotoLightbox({
                                  url: img.url,
                                  title: img.title,
                                  desc: img.description,
                                })
                              }
                              className="cursor-pointer"
                            >
                              <span className="text-[10px] font-bold text-white truncate block drop-shadow">
                                {img.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-700 text-center flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-slate-500" />
                  <p className="text-xs text-slate-400">Trạm này chưa có hình ảnh nào.</p>
                  <button
                    onClick={handleOpenAddModal}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    + Thêm ảnh ngay
                  </button>
                </div>
              )}

              {/* Quick Prompt Bar below gallery */}
              <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
                <span className="italic">Cháu có ảnh chụp thực tế tại Cần Thơ?</span>
                <button
                  onClick={handleOpenAddModal}
                  className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                >
                  Tải lên hoặc dán link ảnh ngay →
                </button>
              </div>
            </div>

            {/* Field Metrics Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Thông số thực địa & Chỉ số quan sát:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentStation.dataMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs font-bold text-amber-400 block font-mono">
                      {metric.value}
                    </span>
                    <span className="text-[10px] text-slate-300 font-semibold block mt-0.5">
                      {metric.label}
                    </span>
                    <span className="text-[9px] text-slate-500 leading-tight block mt-0.5">
                      {metric.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Interactive Widget for Station 3: Simulated Water Level Measurement */}
            {currentStation.id === 'station-do-thi-moi-truong' && (
              <div className="bg-sky-950/30 border border-sky-500/40 p-4 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase">
                    <Droplets className="w-4 h-4 text-sky-400" /> Thước Đo Triều Cường Mô Phỏng Ninh Kiều
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    +{simulatedWaterLevel.toFixed(2)} m
                  </span>
                </div>

                <p className="text-[11px] text-sky-200/90 leading-relaxed">
                  Kéo thanh trượt để mô phỏng đỉnh triều cường rằm tháng 9 - 10 âm lịch trên sông Hậu và rạch Cần Thơ:
                </p>

                <input
                  type="range"
                  min="1.50"
                  max="2.35"
                  step="0.05"
                  value={simulatedWaterLevel}
                  onChange={e => setSimulatedWaterLevel(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>+1.50m (Bình thường)</span>
                  <span className="text-amber-400">+2.00m (Báo động III)</span>
                  <span className="text-rose-400 font-bold">+2.27m (Lịch sử ngập lộ)</span>
                </div>

                <div className="text-[11px] bg-slate-900/80 p-2 rounded-lg text-slate-300">
                  {simulatedWaterLevel >= 2.15 ? (
                    <span className="text-rose-300 font-semibold">
                      ⚠️ Cảnh báo: Mực nước tràn bờ kè Bến Ninh Kiều, ngập các trục đường ven sông (Hai Bà Trưng, Cách Mạng Tháng Tám).
                    </span>
                  ) : simulatedWaterLevel >= 1.90 ? (
                    <span className="text-amber-300">
                      ⚡ Mực nước tiệm cận bờ kè, bắt đầu ngập các cống thoát nước tự nhiên.
                    </span>
                  ) : (
                    <span className="text-emerald-300">
                      ✅ Mực nước an toàn trong hành lang thoát lũ của sông Hậu.
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{currentStation.fieldworkNotice}</span>
            </div>
          </div>
        </div>

        {/* Right: Digital Fieldwork Mission Sheet (Phiếu Nhiệm Vụ) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  Phiếu Nhiệm Vụ Khảo Sát Hiện Trường ({currentStation.stationCode})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Thực hiện các mục khảo sát để hoàn thành minh chứng môn GDĐP Cần Thơ
                </p>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
                {currentStation.tasks.length} nhiệm vụ
              </span>
            </div>

            {/* Task list form */}
            <div className="space-y-4">
              {currentStation.tasks.map((task, idx) => {
                const answerVal = currentProgress.answers[task.id] || '';
                const photoVal = currentProgress.photos[task.id];

                return (
                  <div key={task.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-[11px]">
                          {idx + 1}
                        </span>
                        {task.taskTitle}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">{task.instruction}</p>

                    {/* Task Inputs */}
                    {task.inputType === 'text' && (
                      <textarea
                        value={answerVal}
                        onChange={e => handleAnswerChange(task.id, e.target.value)}
                        placeholder={task.placeholder}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    )}

                    {task.inputType === 'number' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={answerVal}
                          onChange={e => handleAnswerChange(task.id, e.target.value)}
                          placeholder={task.placeholder}
                          className="bg-slate-900 border border-slate-700 text-xs text-white px-3 py-2 rounded-lg w-40 font-mono focus:outline-none focus:border-amber-500"
                        />
                        {task.unit && <span className="text-xs text-slate-400 font-mono">{task.unit}</span>}
                      </div>
                    )}

                    {task.inputType === 'select' && task.options && (
                      <select
                        value={answerVal}
                        onChange={e => handleAnswerChange(task.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                      >
                        <option value="">-- Chọn kết quả khảo sát --</option>
                        {task.options.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {task.inputType === 'photo_upload' && (
                      <div className="flex flex-col gap-2">
                        {photoVal ? (
                          <div className="relative rounded-xl overflow-hidden border border-amber-500/50 bg-slate-900 p-2 flex items-center gap-3">
                            <img src={photoVal} alt="Minh chứng hiện trường" className="w-24 h-18 object-cover rounded-lg border border-slate-700" />
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Đã đính kèm ảnh minh chứng
                              </span>
                              <button
                                onClick={() => handleSimulatePhoto(task.id)}
                                className="text-[11px] text-amber-400 hover:underline text-left cursor-pointer"
                              >
                                Chụp lại ảnh khác
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSimulatePhoto(task.id)}
                              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Camera className="w-4 h-4 text-amber-400" /> Chụp ảnh thực địa mô phỏng
                            </button>
                            <span className="text-[11px] text-slate-500">hoặc nạp minh chứng nhóm</span>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-[10px] text-slate-500 italic">Gợi ý: {task.hint}</p>
                  </div>
                );
              })}
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                {currentProgress.isCompleted
                  ? `Đã nghiệm thu vào lúc ${currentProgress.completedAt}`
                  : 'Kiểm tra kỹ thông tin trước khi nộp phiếu khảo sát'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                  title="In phiếu nhiệm vụ điền dã"
                >
                  <Printer className="w-3.5 h-3.5" /> In phiếu
                </button>

                <button
                  onClick={handleSubmitStation}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Nghiệm Thu Minh Chứng Trạm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Large Display */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center flex flex-col items-center gap-4 shadow-2xl">
            <div className="p-4 bg-white rounded-2xl shadow-inner">
              <QrCode className="w-48 h-48 text-slate-950" />
            </div>

            <div>
              <span className="font-mono text-sm font-bold text-amber-400 px-3 py-1 rounded bg-slate-800 border border-slate-700">
                {currentStation.stationCode}
              </span>
              <h3 className="text-lg font-bold text-white font-serif-title mt-2">
                {currentStation.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Quét mã này bằng camera thiết bị di động của học sinh khi đến địa điểm khảo sát tại quận Ninh Kiều.
              </p>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Đóng cửa sổ QR
            </button>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhotoLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-4 md:p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">Hình ảnh khảo sát thực địa</span>
                <h4 className="text-base md:text-lg font-bold text-white font-serif-title">
                  {activePhotoLightbox.title}
                </h4>
              </div>
              <button
                onClick={() => setActivePhotoLightbox(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={activePhotoLightbox.url}
                alt={activePhotoLightbox.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              {activePhotoLightbox.desc}
            </p>

            <button
              onClick={() => setActivePhotoLightbox(null)}
              className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Đóng xem ảnh
            </button>
          </div>
        </div>
      )}

      {/* Photo Upload & URL Link Modal */}
      {showPhotoUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-5 md:p-6 shadow-2xl flex flex-col gap-4 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  {editingPhotoIndex !== null ? 'Chỉnh Sửa Hình Ảnh' : 'Thêm / Thay Đổi Hình Ảnh Trạm'}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white font-serif-title mt-0.5">
                  {currentStation.name} ({currentStation.stationCode})
                </h3>
              </div>
              <button
                onClick={() => setShowPhotoUploadModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Method Switcher: Upload File vs Paste URL */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setPhotoUploadTab('upload');
                  setUploadError(null);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  photoUploadTab === 'upload'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UploadCloud className="w-4 h-4" /> Tải ảnh từ thiết bị
              </button>
              <button
                onClick={() => {
                  setPhotoUploadTab('url');
                  setUploadError(null);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  photoUploadTab === 'url'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" /> Dán link ảnh (URL)
              </button>
            </div>

            {/* Tab 1: Upload from Device */}
            {photoUploadTab === 'upload' && (
              <div className="flex flex-col gap-3">
                {uploadPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-950 max-h-56 flex items-center justify-center">
                    <img
                      src={uploadPreview}
                      alt="Ảnh tải lên xem trước"
                      className="max-h-56 w-full object-contain"
                    />
                    <div className="absolute top-2 right-2">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold cursor-pointer transition-colors shadow-lg flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5" /> Chọn ảnh khác
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelected}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-colors">
                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Nhấp để chọn ảnh từ máy tính hoặc điện thoại
                    </span>
                    <span className="text-[11px] text-slate-400 text-center">
                      Hỗ trợ định dạng JPG, PNG, WEBP (Dung lượng tối đa 8MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelected}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}

            {/* Tab 2: Paste URL */}
            {photoUploadTab === 'url' && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Đường dẫn liên kết hình ảnh (URL):
                  </label>
                  <input
                    type="url"
                    value={inputPhotoUrl}
                    onChange={(e) => setInputPhotoUrl(e.target.value)}
                    placeholder="https://example.com/anh-ben-ninh-kieu.jpg"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs text-white p-3 rounded-xl focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Cháu có thể dán link ảnh từ bất kỳ trang web nào (ảnh Wikimedia, báo Cần Thơ, Google Drive công khai...)
                  </span>
                </div>

                {inputPhotoUrl.trim() && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 max-h-48 bg-slate-950 flex items-center justify-center p-2">
                    <img
                      src={inputPhotoUrl.trim()}
                      alt="Xem trước liên kết ảnh"
                      className="max-h-44 object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80';
                        setUploadError('Đường link ảnh có vẻ không hiển thị được. Hãy kiểm tra lại link!');
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Photo Metadata Form */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Tiêu đề bức ảnh:
                </label>
                <input
                  type="text"
                  value={inputPhotoTitle}
                  onChange={(e) => setInputPhotoTitle(e.target.value)}
                  placeholder="Ví dụ: Cổng chính Bảo tàng Cần Thơ..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Địa điểm / Phụ đề:
                  </label>
                  <input
                    type="text"
                    value={inputPhotoSubtitle}
                    onChange={(e) => setInputPhotoSubtitle(e.target.value)}
                    placeholder="Số 1 Đại lộ Hòa Bình, Ninh Kiều..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="flex items-center sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={inputIsPrimary}
                      onChange={(e) => setInputIsPrimary(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                    />
                    <span className="font-semibold text-amber-300">
                      ★ Đặt làm ảnh đại diện chính
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Mô tả tư liệu khảo sát:
                </label>
                <textarea
                  value={inputPhotoDesc}
                  onChange={(e) => setInputPhotoDesc(e.target.value)}
                  placeholder="Ghi chú chi tiết về bức ảnh (góc chụp, thời điểm, hiện vật nghiên cứu...)"
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs text-white p-2.5 rounded-xl focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowPhotoUploadModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSavePhoto}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" /> Lưu Hình Ảnh Vào Trạm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
