export const dynamicYears = () => {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );
  return years;
};
