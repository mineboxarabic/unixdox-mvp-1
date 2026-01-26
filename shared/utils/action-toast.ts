/**
 * Toast utilities for displaying action results
 * Single Responsibility: Handles all toast display logic for ActionResult
 * 
 * This centralizes error/warning display logic to avoid duplication
 * and makes it easy to add new error types in one place.
 */

import { toaster } from '@/shared/components/ui';
import { ActionResult } from '@/shared/types/actions';
import { AI_ERROR_CODES } from '@/shared/utils/errors';

/**
 * Configuration for toast display based on error codes
 * Open/Closed: Add new error types here without modifying display logic
 */
const ERROR_TITLE_MAP: Record<string, string> = {
    [AI_ERROR_CODES.CONFIG_ERROR]: 'Erreur de configuration',
    [AI_ERROR_CODES.EXTRACTION_FAILED]: "Erreur d'analyse",
    [AI_ERROR_CODES.QUOTA_EXCEEDED]: 'Limite atteinte',
    [AI_ERROR_CODES.INVALID_RESPONSE]: "Erreur d'analyse",
    // Auth errors
    'AUTH_REAUTH_REQUIRED': 'Session expirée',
    'AUTH_ERROR': "Erreur d'authentification",
};

/**
 * Gets the appropriate title for an error based on its code
 */
function getErrorTitle(errorCode?: string): string {
    if (!errorCode) return 'Erreur';

    // Check for exact match first
    if (ERROR_TITLE_MAP[errorCode]) {
        return ERROR_TITLE_MAP[errorCode];
    }

    // Check for prefix matches (e.g., AI_ prefix)
    if (errorCode.startsWith('AI_')) {
        return "Erreur d'analyse";
    }
    if (errorCode.startsWith('AUTH')) {
        return "Erreur d'authentification";
    }

    return 'Erreur';
}

/**
 * Displays a toast for an ActionResult
 * Handles both success with warnings and failure cases
 */
export function showActionResultToast<T>(result: ActionResult<T>): void {
    if (result.success) {
        // Show warning toast if present (e.g., AI extraction failed but upload succeeded)
        if (result.warning) {
            toaster.create({
                title: 'Avertissement',
                description: result.warning,
                type: 'warning',
            });
        }
    } else {
        // Show error toast
        const title = result.requiresReauth
            ? 'Session expirée'
            : getErrorTitle(result.errorCode);

        toaster.create({
            title,
            description: result.error || 'Une erreur inattendue s\'est produite.',
            type: 'error',
        });
    }
}

/**
 * Displays toasts for multiple ActionResults (batch uploads)
 * Shows only the first warning and first error to avoid toast spam
 */
export function showBatchActionResultToasts<T>(results: ActionResult<T>[]): void {
    // Show first warning
    const firstWarning = results.find(r => r.success && r.warning);
    if (firstWarning && firstWarning.success && firstWarning.warning) {
        toaster.create({
            title: 'Avertissement',
            description: firstWarning.warning,
            type: 'warning',
        });
    }

    // Show first error
    const firstError = results.find(r => !r.success);
    if (firstError && !firstError.success) {
        const title = firstError.requiresReauth
            ? 'Session expirée'
            : getErrorTitle(firstError.errorCode);

        toaster.create({
            title,
            description: firstError.error || 'Une erreur inattendue s\'est produite.',
            type: 'error',
        });
    }
}
