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
