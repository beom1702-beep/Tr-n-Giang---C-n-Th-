/**
 * Vietnamese Speech Utility for Tay Do So Platform
 * Uses server-side /api/tts for 100% authentic native Vietnamese speech pronunciation,
 * with fallback to client-side SpeechSynthesis only if verified vi-VN voice exists.
 */

let currentAudio: HTMLAudioElement | null = null;
let cachedViVoice: SpeechSynthesisVoice | null = null;

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

async function findClientVietnameseVoice(): Promise<SpeechSynthesisVoice | null> {
  if (cachedViVoice) return cachedViVoice;
  if (!('speechSynthesis' in window)) return null;

  const getVoices = (): SpeechSynthesisVoice[] => window.speechSynthesis.getVoices();
  let voices = getVoices();

  if (voices.length === 0) {
    await new Promise((resolve) => {
      const handler = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handler);
        resolve(true);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handler);
      setTimeout(resolve, 300);
    });
    voices = getVoices();
  }

  const vi = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('vi') ||
      v.lang.toLowerCase().includes('vi-vn') ||
      v.name.toLowerCase().includes('vietnam')
  );

  if (vi) {
    cachedViVoice = vi;
    return vi;
  }
  return null;
}

export async function speakVietnamese(text: string, options: SpeakOptions = {}): Promise<boolean> {
  stopSpeaking();

  const cleanText = text
    .replace(/\[.*?\]/g, '')
    .replace(/[*_#`"']/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  if (!cleanText) return false;

  // 1. Primary Method: 100% Native Vietnamese Server-Side Audio Stream (/api/tts)
  try {
    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
    const audio = new Audio(ttsUrl);
    currentAudio = audio;

    audio.onplay = () => {
      if (options.onStart) options.onStart();
    };

    audio.onended = () => {
      currentAudio = null;
      if (options.onEnd) options.onEnd();
    };

    audio.onerror = async () => {
      console.warn('Server TTS stream unavailable, falling back to verified client Vietnamese voice');
      currentAudio = null;
      const fallbackSuccess = await speakWithSpeechSynthesisFallback(cleanText, options);
      if (!fallbackSuccess && options.onError) {
        options.onError(new Error('No Vietnamese voice available'));
      }
    };

    await audio.play();
    return true;
  } catch (err) {
    console.warn('Direct audio play error, attempting verified client-side voice:', err);
    return speakWithSpeechSynthesisFallback(cleanText, options);
  }
}

async function speakWithSpeechSynthesisFallback(cleanText: string, options: SpeakOptions): Promise<boolean> {
  if (!('speechSynthesis' in window)) return false;

  const viVoice = await findClientVietnameseVoice();
  // DO NOT play if no genuine Vietnamese voice exists to avoid English voice misreading Vietnamese
  if (!viVoice) {
    console.warn('No genuine Vietnamese voice on system. Skipping English mispronunciation.');
    if (options.onEnd) options.onEnd();
    return false;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.voice = viVoice;
  utterance.lang = viVoice.lang || 'vi-VN';
  utterance.rate = options.rate ?? 0.95;

  if (options.onStart) utterance.onstart = options.onStart;
  utterance.onend = () => {
    if (options.onEnd) options.onEnd();
  };
  utterance.onerror = (e) => {
    if (options.onError) options.onError(e);
  };

  window.speechSynthesis.speak(utterance);
  return true;
}
