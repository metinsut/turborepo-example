export function base64ToArrayBufferConverter(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const getDoubleDigit = (value: number) => `0${value}`.slice(-2);

export function intervalToHoursConverter(interval: number) {
  const hoursList: string[] = [];
  let minute = 0;
  let hour = 0;
  const steps = (24 * 60) / interval;
  hoursList.push(`${getDoubleDigit(hour)}:${getDoubleDigit(minute)}`);
  for (let i = 0; i < steps; i++) {
    minute += interval;
    if (minute >= 60) {
      minute -= 60;
      hour++;
    }

    if (hour === 24) {
      hour = 23;
      minute = 59;
    }

    hoursList.push(`${getDoubleDigit(hour)}:${getDoubleDigit(minute)}`);
  }
  return hoursList;
}
