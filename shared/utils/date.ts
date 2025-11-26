export function formatDate(date: Date | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!date) return "--/--/----";
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options || defaultOptions).format(new Date(date));
}
