// src/utils/logger.ts
// Tiny human-friendly logger. Replace with a structured logger in production.

export function logInfo(...args: unknown[]) {
  console.log('[info]', ...args);
}

export function logWarn(...args: unknown[]) {
  console.warn('[warn]', ...args);
}

export function logError(...args: unknown[]) {
  console.error('[error]', ...args);
}