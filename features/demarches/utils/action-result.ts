type ActionFailure = {
  success: false;
  error?: string;
  errorCode?: string;
};

type ActionResultLike =
  | ActionFailure
  | {
      success: true;
      data?: unknown;
    };

/**
 * Returns true when a demarches action result indicates the user is unauthenticated.
 */
export function shouldRedirectToLogin(result: ActionResultLike): boolean {
  return result.success === false && result.errorCode === 'UNAUTHENTICATED';
}
