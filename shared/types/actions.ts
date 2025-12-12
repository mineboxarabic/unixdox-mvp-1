export type ActionResult<T> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]>; requiresReauth?: boolean };
