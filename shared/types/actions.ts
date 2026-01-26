export type ActionResult<T> =
  | { success: true; data: T; message?: string; warning?: string; warningCode?: string }
  | { success: false; error: string; errorCode?: string; fieldErrors?: Record<string, string[]>; requiresReauth?: boolean };
