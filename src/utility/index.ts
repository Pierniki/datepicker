export const getDaysInMonthArr = (month: number, year: number): number[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from(Array.from({ length: daysInMonth }, (_, i) => i + 1));
};

export const mod = (n: number, m: number): number => {
  return ((n % m) + m) % m;
};
