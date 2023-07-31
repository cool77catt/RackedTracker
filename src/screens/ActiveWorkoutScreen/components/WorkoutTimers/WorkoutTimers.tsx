// TODO: FEATURE - allow ability to change sounds, and set volume to 1 for the non-silent sounds
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';
import AlarmTone from '../../../../assets/mixkit-alarm-tone-996.wav';
import { TimerContext } from '../../../../contexts';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import TimerControls, { TimerControlsEventType } from './TimerControls';

export type TimersProps = {
  isEnabled: boolean;
};

const WorkoutTimers = ({ isEnabled }: TimersProps) => {
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(false);
  const [alarmSound, setAlarmSound] = useState<Sound | null>(null);
  const timerContext = useContext(TimerContext);
  const styles = useStyles();

  useEffect(() => {
    const tmpSound = new Sound(AlarmTone, (error) => {
      if (error) {
        console.warn('Error loading sound: ', error);
        return;
      }
      tmpSound.setVolume(0); // Silence for now
      setAlarmSound(tmpSound);
    });
  }, []);

  const timerControlCallback = useCallback(
    (eventType: TimerControlsEventType) => {
      switch (eventType) {
        case TimerControlsEventType.Start:
          setTimerIsRunning(true);
          setTimerIsPaused(false);
          break;
        case TimerControlsEventType.Pause:
          setTimerIsPaused(true);
          break;
        case TimerControlsEventType.Resume:
          setTimerIsPaused(false);
          break;
        case TimerControlsEventType.Stop:
          setTimerIsRunning(false);
          setTimerIsPaused(false);
          break;
      }
    },
    [],
  );

  const timerExpiredCallback = useCallback(() => {
    console.warn('Timer expired!');
    if (alarmSound) {
      alarmSound.play();
    }
    setTimerIsRunning(false);
  }, [alarmSound]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stopwatchContainer}>
        <Stopwatch isRunning={isEnabled} textVariant="displaySmall" />
      </View>
      <View style={styles.timerContainer}>
        <Timer
          duration={timerContext?.duration ?? 0}
          isRunning={timerIsRunning}
          isPaused={timerIsPaused}
          onExpired={timerExpiredCallback}
          textVariant="displayLarge"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TimerControls
          isEnabled={true}
          isRunning={timerIsRunning}
          isPaused={timerIsPaused}
          eventHandler={timerControlCallback}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stopwatchContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    timerContainer: {
      flex: 1,
      padding: 8,
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
  });
};

export default WorkoutTimers;
