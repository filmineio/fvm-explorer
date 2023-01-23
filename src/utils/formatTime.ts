export const formatTime = (dateString: string | undefined): string => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  };
  const defaultLocale = 'en-US';

  const d = dateString ? new Date(dateString).toLocaleTimeString(defaultLocale, timeFormat) : 'Not Available';
  return d === 'Invalid Date' ? 'N/A' : d;
};
