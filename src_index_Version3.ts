// src/index.ts
// This file exports the main, human-readable API for the generator.
// Think of it as "the thing you import when you want to generate content".

import { Generator, GeneratorOptions } from './generator';

// A convenience function for quick imports:
// import { createGenerator } from 'ai-content-generator'
export function createGenerator(opts: GeneratorOptions) {
  return new Generator(opts);
}

export * from './generator';
export * from './types';