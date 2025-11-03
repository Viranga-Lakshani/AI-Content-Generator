// tests/generator.test.ts
// Basic unit tests to check the generator's behavior in a controlled way.
// These tests use the "custom" provider which returns a predictable string.

import { Generator } from '../src/generator';

describe('Generator basic behavior', () => {
  it('throws on empty prompt', async () => {
    const g = new Generator({ provider: 'custom' as any });
    await expect(g.generate('')).rejects.toThrow('Prompt must be a non-empty string.');
  });

  it('returns a simulated reply with custom provider', async () => {
    const g = new Generator({ provider: 'custom' as any });
    const result = await g.generate('Hello world');
    expect(result.text).toMatch(/custom provider simulated reply/i);
  });
});
