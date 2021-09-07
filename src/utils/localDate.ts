export const localDate = (date?: Date): string => {
  if (!date) return '';

  const formatDate = new Date(date).toLocaleDateString();

  if (formatDate === 'Invalid Date') {
    return '';
  }

  return formatDate;
};
