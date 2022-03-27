import { useEffect, useState } from 'react';

export const useCountdown = (onCountdownEnd: () => void, endDateTime: string, enabled: boolean) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const refreshDate = () => {
      function pad(n: number) {
        return `0${n}`.slice(-2);
      }

      const expiryDate = new Date(endDateTime);
      const millisecondsDiff = expiryDate.getTime() - new Date().getTime();

      if (millisecondsDiff > 0) {
        const ms = millisecondsDiff % 1000;
        const secondsDiff = (millisecondsDiff - ms) / 1000;

        const secs = secondsDiff % 60;
        const minutesDiff = (secondsDiff - secs) / 60;

        const mins = minutesDiff % 60;
        const hrs = (minutesDiff - mins) / 60;

        setCountdown(`${pad(hrs)}:${pad(mins)}:${pad(secs)}`);
      } else {
        setCountdown('');
        onCountdownEnd();
        clearInterval(interval);
      }
    };

    let interval: NodeJS.Timeout;
    if (enabled && endDateTime) {
      interval = setInterval(refreshDate, 1000);
    }
    return () => clearInterval(interval);
  }, [endDateTime, onCountdownEnd, enabled]);

  return countdown;
};
