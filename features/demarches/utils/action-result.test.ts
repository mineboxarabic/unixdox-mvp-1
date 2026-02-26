/**
 * Unit tests for demarches action-result helpers.
 *
 * Run with: npx tsx features/demarches/utils/action-result.test.ts
 */

import { shouldRedirectToLogin } from './action-result';

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

function assertEquals(actual: unknown, expected: unknown, message?: string) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

console.log('\n🧪 Testing demarches action result helpers\n');

test('redirects for explicit UNAUTHENTICATED error code', () => {
  const result = { success: false as const, error: 'Non authentifié', errorCode: 'UNAUTHENTICATED' };
  assertEquals(shouldRedirectToLogin(result), true);
});

test('does not redirect for DB unavailability', () => {
  const result = { success: false as const, error: 'Base de données temporairement indisponible', errorCode: 'DB_UNAVAILABLE' };
  assertEquals(shouldRedirectToLogin(result), false);
});

test('does not redirect for successful result', () => {
  const result = { success: true as const, data: [] };
  assertEquals(shouldRedirectToLogin(result), false);
});
