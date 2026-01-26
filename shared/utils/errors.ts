/**
 * Error detection and handling utilities
 * Single Responsibility: Only handles error classification
 */

// Error codes for specific auth issues
export const AUTH_ERROR_CODES = {
  INVALID_GRANT: 'INVALID_GRANT',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  GOOGLE_NOT_LINKED: 'GOOGLE_NOT_LINKED',
} as const;

export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];

/**
 * Checks if an error is a Google OAuth error requiring re-authentication
 * Common causes: expired refresh token, revoked access, password change
 */
export function isGoogleAuthError(error: unknown): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = (error as any)?.code;

  return (
    errorMessage.includes('invalid_grant') ||
    errorMessage.includes('Token has been expired or revoked') ||
    errorMessage.includes('Invalid Credentials') ||
    errorMessage.includes('invalid_token') ||
    errorCode === 401 ||
    (errorCode === 400 && errorMessage.includes('invalid_grant'))
  );
}

/**
 * User-friendly error messages for auth errors
 */
export const AUTH_ERROR_MESSAGES = {
  REAUTH_REQUIRED: 'Votre session Google Drive a expiré. Veuillez vous reconnecter pour continuer.',
  GOOGLE_NOT_LINKED: 'Compte Google Drive non lié. Veuillez connecter votre compte Google.',
  GENERIC_AUTH_ERROR: 'Erreur d\'authentification. Veuillez réessayer.',
} as const;

// ============================================
// AI Service Error Handling
// ============================================

/**
 * Error codes for AI service issues
 */
export const AI_ERROR_CODES = {
  CONFIG_ERROR: 'AI_SERVICE_CONFIG_ERROR',
  EXTRACTION_FAILED: 'AI_EXTRACTION_FAILED',
  QUOTA_EXCEEDED: 'AI_QUOTA_EXCEEDED',
  INVALID_RESPONSE: 'AI_INVALID_RESPONSE',
} as const;

export type AIErrorCode = typeof AI_ERROR_CODES[keyof typeof AI_ERROR_CODES];

/**
 * User-friendly error messages for AI service errors (French)
 */
export const AI_ERROR_MESSAGES = {
  [AI_ERROR_CODES.CONFIG_ERROR]: 'Le service d\'analyse AI n\'est pas configuré. Contactez l\'administrateur.',
  [AI_ERROR_CODES.EXTRACTION_FAILED]: 'L\'analyse automatique a échoué. Le document a été importé sans métadonnées.',
  [AI_ERROR_CODES.QUOTA_EXCEEDED]: 'Limite d\'analyse atteinte. Réessayez plus tard.',
  [AI_ERROR_CODES.INVALID_RESPONSE]: 'Réponse AI invalide. Le document a été importé sans métadonnées.',
} as const;

/**
 * Checks if an error is an AI service configuration error (missing API key, etc.)
 */
export function isAIConfigError(error: unknown): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const statusCode = (error as any)?.status;

  return (
    errorMessage.includes('unregistered callers') ||
    errorMessage.includes('API Key') ||
    errorMessage.includes('API key') ||
    errorMessage.includes('GEMINI_API_KEY') ||
    statusCode === 403 ||
    statusCode === 401
  );
}

/**
 * Checks if an error is an AI quota/rate limit error
 */
export function isAIQuotaError(error: unknown): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const statusCode = (error as any)?.status;

  return (
    errorMessage.includes('quota') ||
    errorMessage.includes('rate limit') ||
    errorMessage.includes('Resource has been exhausted') ||
    statusCode === 429
  );
}

/**
 * Gets the appropriate AI error code for an error
 */
export function getAIErrorCode(error: unknown): AIErrorCode {
  if (isAIConfigError(error)) return AI_ERROR_CODES.CONFIG_ERROR;
  if (isAIQuotaError(error)) return AI_ERROR_CODES.QUOTA_EXCEEDED;
  return AI_ERROR_CODES.EXTRACTION_FAILED;
}

/**
 * Gets a user-friendly message for an AI error
 */
export function getAIErrorMessage(error: unknown): string {
  const code = getAIErrorCode(error);
  return AI_ERROR_MESSAGES[code];
}

