import { addSeconds } from 'date-fns';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import TimerText, { TimerTextProps } from './TimerText';

enum TimerState {
  Off,
  Running,
  Paused,
}

interface TimerProps extends Pick<TimerTextProps, 'textVariant' | 'textStyle'> {
  duration: number;
  isRunning: boolean;
  isPaused: boolean;
  onExpired?: () => void;
}

function getTimerExpiryTimestamp(duration: number): Date {
  return addSeconds(new Date(), duration);
}

const Timer = ({
  duration,
  isRunning,
  isPaused,
  onExpired,
  textVariant,
  textStyle,
}: TimerProps) => {
  // Todo - detect if the duration has changed
  const [timerState, setTimerState] = useState<TimerState>(TimerState.Off);
  const [prevDuration, setPrevDuration] = useState<number>(duration);

  const {
    //totalSeconds,
    seconds,
    minutes,
    hours,
    //isRunning: hookIsRunning,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp: getTimerExpiryTimestamp(duration),
    autoStart: false,
    onExpire: () => {
      onExpired?.();
      restartTimer(getTimerExpiryTimestamp(duration), false);
    },
  });

  switch (timerState) {
    case TimerState.Off:
      if (isRunning) {
        startTimer();
        setTimerState(TimerState.Running);
      } else if (duration !== prevDuration) {
        // Set the timer with the latest duration
        restartTimer(getTimerExpiryTimestamp(duration), false);
        setPrevDuration(duration);
      }
      break;
    case TimerState.Running:
      if (!isRunning) {
        // Stop the timer
        restartTimer(getTimerExpiryTimestamp(duration), false);
        setTimerState(TimerState.Off);
      } else if (isPaused) {
        pauseTimer();
        setTimerState(TimerState.Paused);
      }
      break;
    case TimerState.Paused:
      if (!isRunning) {
        // Stop the timer
        restartTimer(getTimerExpiryTimestamp(duration), false);
        setTimerState(TimerState.Off);
      } else if (!isPaused) {
        resumeTimer();
        setTimerState(TimerState.Running);
      }
      break;
  }

  // if (isRunning) {
  //   if (!hookIsRunning) {
  //     if (!isPaused) {
  //       startTimer();
  //     }
  //   } else if (isPaused) {
  //     pauseTimer();
  //   }
  // } else if (hookIsRunning) {
  //   // Reset the timer (stop the timer)
  //   restartTimer(getTimerExpiryTimestamp(duration), false)
  // }

  // if (isRunning && !hookIsRunning) {
  //   startTimer();
  // } else if (!hookIsRunning && isPaused) {
  //   pauseTimer();
  // } else if ()

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

export default Timer;
