// src/types.ts
// Small, friendly type definitions that explain what each piece means.

export type Provider = 'openai' | 'custom';

export interface GeneratorOptions {
  // Which provider to use. Default: openai
  provider?: Provider;

  // The API key for your provider. Leave undefined to read from process.env.
  apiKey?: string;

  // A simple temperature control for creative vs conservative responses.
  temperature?: number;
}

export interface GenerationResult {
  // The text the model returned.
  text: string;

  // Metadata can include model name / provider / tokens used etc.
  metadata?: Record<string, unknown>;
}