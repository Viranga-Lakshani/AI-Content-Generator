// src/server.ts
// A tiny express server that exposes a single /generate endpoint for quick testing.
// This is intentionally minimal — suitable for local experimentation.

import express from 'express';
import bodyParser from 'body-parser';
import { createGenerator } from './index';

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('AI Content Generator — server is running. POST /generate with { prompt } to use.');
});

app.post('/generate', async (req, res) => {
  try {
    const prompt: string = req.body?.prompt;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    const gen = createGenerator({});
    const result = await gen.generate(prompt);
    return res.json({ text: result.text, metadata: result.metadata });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log('Send POST /generate with JSON { "prompt": "..." }');
});