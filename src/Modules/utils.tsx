export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatTime = (totalMin: number) => {
  const hours = Math.floor(totalMin / 60);
  let minutes = `${totalMin % 60}`;
  if (minutes.length < 2) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};