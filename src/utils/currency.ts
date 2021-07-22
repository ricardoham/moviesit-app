export const currencyFormat = (value: number): string => `USD${new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(value)}`;
