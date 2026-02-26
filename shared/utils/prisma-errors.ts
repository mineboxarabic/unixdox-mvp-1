/**
 * Detect transient Prisma connectivity failures (typically Atlas networking/topology issues).
 * These errors can be handled with graceful UI fallbacks instead of hard crashes.
 */
export function isPrismaConnectivityError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('server selection timeout')
    || message.includes('replicasetnoprimary')
    || message.includes('no available servers')
    || message.includes('raw query failed')
  );
}