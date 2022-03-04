export const convertToMinutes = (duration) => {
  return (
    (duration - (duration %= 60)) / 60 + (9 < duration ? ":" : ":0") + duration
  );
};
