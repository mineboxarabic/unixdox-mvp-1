/**
 * Unit tests for Prisma connectivity error detection.
 *
 * Run with: npx tsx shared/utils/prisma-errors.test.ts
 */

import { isPrismaConnectivityError } from './prisma-errors';

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

console.log('\n🧪 Testing Prisma connectivity error detection\n');

test('returns true for server selection timeout message', () => {
  const error = new Error('Raw query failed. Kind: Server selection timeout: No available servers.');
  assertEquals(isPrismaConnectivityError(error), true);
});

test('returns true for ReplicaSetNoPrimary message', () => {
  const error = new Error('Topology: { Type: ReplicaSetNoPrimary }');
  assertEquals(isPrismaConnectivityError(error), true);
});

test('returns true for generic raw query failed message', () => {
  const error = new Error('Raw query failed. Code: unknown.');
  assertEquals(isPrismaConnectivityError(error), true);
});

test('returns false for non-connectivity Prisma-like error', () => {
  const error = new Error('Unique constraint failed on the fields: (`email`)');
  assertEquals(isPrismaConnectivityError(error), false);
});

test('returns false for non-error values', () => {
  assertEquals(isPrismaConnectivityError('server selection timeout'), false);
  assertEquals(isPrismaConnectivityError(null), false);
});
