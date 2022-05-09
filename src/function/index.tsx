export const convertToMinutes = (duration: number): string => {
  return (
    (duration - (duration %= 60)) / 60 + (9 < duration ? ":" : ":0") + duration
  );
};

export const numberWithSpaces = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
