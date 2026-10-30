import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleArtisanChat, handleRubricEvaluate } from './src/server/aiHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// API: Artisan Virtual RAG Chat (Bác Ba Lập)
app.post('/api/artisan-chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ.' });
    }
    const result = await handleArtisanChat(message, history || []);
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/artisan-chat:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  }
});

// API: 4-Criteria Rubric Assistant
app.post('/api/rubric-evaluate', async (req, res) => {
  try {
    const { draft1, draft2, topic } = req.body || {};
    if (!draft1 && !draft2) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung bản thảo.' });
    }
    const result = await handleRubricEvaluate(draft1 || '', draft2 || '', topic);
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/rubric-evaluate:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi chấm điểm theo Rubric.' });
  }
});

// API: 100% Native Vietnamese Text-To-Speech (TTS) Proxy
app.get('/api/tts', async (req, res) => {
  try {
    const rawText = String(req.query.text || '').trim();
    if (!rawText) {
      return res.status(400).send('Missing text parameter');
    }

    // Clean brackets and extra symbols
    const cleanText = rawText
      .replace(/\[.*?\]/g, '')
      .replace(/[*_#`"']/g, '')
      .slice(0, 400);

    // Split text into short natural chunks <= 160 characters
    const sentenceChunks = cleanText.match(/[^.!?,\n]+[.!?,\n]?/g) || [cleanText];
    const audioBuffers: Buffer[] = [];

    for (const chunk of sentenceChunks) {
      const trimmed = chunk.trim();
      if (!trimmed || trimmed.length < 2) continue;

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(trimmed)}&tl=vi&client=tw-ob`;
      const ttsRes = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/',
        },
      });

      if (ttsRes.ok) {
        const ab = await ttsRes.arrayBuffer();
        audioBuffers.push(Buffer.from(ab));
      }
    }

    if (audioBuffers.length === 0) {
      return res.status(502).send('Could not fetch TTS audio');
    }

    const merged = Buffer.concat(audioBuffers);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(merged);
  } catch (err: any) {
    console.error('Error in /api/tts:', err);
    return res.status(500).json({ error: 'TTS audio generation failed' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Tay Do So - Can Tho EdTech 3D', timestamp: new Date().toISOString() });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
