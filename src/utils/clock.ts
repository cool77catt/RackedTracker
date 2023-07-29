function padded(number: number): string {
  return number.toFixed(0).toString().padStart(2, '0');
}

export function getFormattedTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${padded(hours)}:${padded(minutes)}:${padded(remainingSeconds)}`;
}
