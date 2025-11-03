// src/generator.ts
// This file contains the core "Generator" class — small, practical, and easy to read.
// It currently supports a simple OpenAI-compatible HTTP call using axios.
// Replace or extend the `_callProvider` method to plug in other providers.

import axios from 'axios';
import dotenv from 'dotenv';
import { GeneratorOptions, GenerationResult } from './types';
import { logInfo, logError } from './utils/logger';

dotenv.config();

export class Generator {
  private provider: string;
  private apiKey?: string;
  private temperature: number;

  constructor(opts: GeneratorOptions = {}) {
    this.provider = opts.provider ?? 'openai';
    this.apiKey = opts.apiKey ?? process.env.OPENAI_API_KEY;
    this.temperature = opts.temperature ?? 0.7;

    logInfo(
      `Generator initialized. Provider: ${this.provider}. ${
        this.apiKey ? 'API Key loaded' : 'No API key found in config'
      }`
    );
  }

  // The main method: accepts a prompt and returns generated text.
  // We keep the interface intentionally simple.
  async generate(prompt: string): Promise<GenerationResult> {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt must be a non-empty string.');
    }

    logInfo('Generating content for prompt:', prompt);

    try {
      const text = await this._callProvider(prompt);
      const result: GenerationResult = { text, metadata: { provider: this.provider } };
      logInfo('Generation complete.');
      return result;
    } catch (err) {
      logError('Generation failed:', (err as Error).message);
      throw err;
    }
  }

  // Minimal provider call. Designed so it's obvious and replaceable.
  private async _callProvider(prompt: string): Promise<string> {
    if (this.provider === 'openai') {
      if (!this.apiKey) throw new Error('OPENAI_API_KEY missing. See .env.example.');

      // We use the OpenAI v1 completions endpoint signature as an example.
      // Many providers use similar POST JSON structures.
      const endpoint = 'https://api.openai.com/v1/completions';

      const payload = {
        model: 'text-davinci-003', // conservative default; swap as you like
        prompt,
        max_tokens: 600,
        temperature: this.temperature
      };

      const headers = {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.post(endpoint, payload, { headers, timeout: 15000 });

      // The object shape here follows OpenAI's /v1/completions response.
      const text = response.data?.choices?.[0]?.text;
      if (!text) throw new Error('Provider returned an unexpected response.');
      return text.trim();
    }

    // Fallback for a fake/custom provider
    if (this.provider === 'custom') {
      // This branch lets you implement a mock or 3rd-party call
      return Promise.resolve(`(custom provider simulated reply for prompt: ${prompt.slice(0, 80)}...)`);
    }

    throw new Error(`Unsupported provider: ${this.provider}`);
  }
}