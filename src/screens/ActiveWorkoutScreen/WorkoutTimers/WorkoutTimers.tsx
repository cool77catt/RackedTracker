// TODO: FEATURE - allow ability to change sounds, and set volume to 1 for the non-silent sounds
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';
import AlarmTone from '../../../assets/mixkit-alarm-tone-996.wav';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import TimerControls, { TimerControlsEventType } from './TimerControls';

export type TimersProps = {
  isEnabled: boolean;
};

const WorkoutTimers = ({ isEnabled }: TimersProps) => {
  const [timerDuration, setTimerDuration] = useState(5); // 90 seconds
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(false);
  const [alarmSound, setAlarmSound] = useState<Sound | null>(null);
  const styles = useStyles();

  useEffect(() => {
    const tmpSound = new Sound(AlarmTone, (error) => {
      if (error) {
        console.warn('Error loading sound: ', error);
        return;
      }
      console.log('loaded sound successfully');
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
      {/* <TimerEditModal visible={true} /> */}
      <View style={styles.stopwatchContainer}>
        <Stopwatch isRunning={isEnabled} textVariant="displaySmall" />
      </View>
      <View style={styles.timerContainer}>
        <Timer
          duration={timerDuration}
          isRunning={timerIsRunning}
          isPaused={timerIsPaused}
          onExpired={timerExpiredCallback}
          textVariant="displayLarge"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TimerControls
          isEnabled={isEnabled}
          isRunning={timerIsRunning}
          isPaused={timerIsPaused}
          eventHandler={timerControlCallback}
        />
        {/* <View style={styles.buttonRunningContainer}>{renderButtons()}</View> */}
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
