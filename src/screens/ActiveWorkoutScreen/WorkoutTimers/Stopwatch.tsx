import { useStopwatch } from 'react-timer-hook';
import TimerText, { TimerTextProps } from './TimerText';

interface StopwatchProps
  extends Pick<TimerTextProps, 'textVariant' | 'textStyle'> {
  isRunning: boolean;
}

const Stopwatch = ({ isRunning, textVariant, textStyle }: StopwatchProps) => {
  const {
    //totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning: hookIsRunning,
    //start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  // Start the timer if it hasn't been started already
  if (isRunning && !hookIsRunning) {
    reset(new Date(), true);
  } else if (!isRunning && hookIsRunning) {
    pause();
  }

  return (
    <TimerText
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      textVariant={textVariant}
      textStyle={textStyle}
    />
  );
};

export default Stopwatch;
