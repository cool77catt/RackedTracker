import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import TimerControlButton from './TimerControlButton';

const START_ICON = 'play';
const PAUSE_ICON = 'pause';
const STOP_ICON = 'stop';
const RESUME_ICON = 'play';
const EDIT_ICON = 'pencil';

export enum TimerControlsEventType {
  Start,
  Pause,
  Resume,
  Stop,
}

export type TimerControlsProps = {
  isEnabled: boolean;
  isRunning: boolean;
  isPaused: boolean;
  eventHandler?: (eventType: TimerControlsEventType) => void;
};

const TimerControls = ({
  isEnabled,
  isRunning,
  isPaused,
  eventHandler,
}: TimerControlsProps) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const renderActiveButtons = useCallback(() => {
    return (
      <>
        {!isPaused ? (
          <TimerControlButton
            text="Pause"
            icon={PAUSE_ICON}
            isEnabled={isEnabled}
            onPress={() => eventHandler?.(TimerControlsEventType.Pause)}
          />
        ) : (
          <TimerControlButton
            text="Resume"
            icon={RESUME_ICON}
            isEnabled={isEnabled}
            onPress={() => eventHandler?.(TimerControlsEventType.Resume)}
          />
        )}
        <TimerControlButton
          text="Stop"
          icon={STOP_ICON}
          isEnabled={isEnabled}
          onPress={() => eventHandler?.(TimerControlsEventType.Stop)}
        />
      </>
    );
  }, [eventHandler, isEnabled, isPaused]);

  const renderInactiveButtons = useCallback(() => {
    return (
      <>
        <TimerControlButton
          text="Start"
          isEnabled={isEnabled}
          icon={START_ICON}
          onPress={() => eventHandler?.(TimerControlsEventType.Start)}
        />
        <TimerControlButton
          text="Edit"
          isEnabled={isEnabled}
          icon={EDIT_ICON}
          onPress={() => {
            navigation.navigate('Edit Timer');
          }}
        />
      </>
    );
  }, [eventHandler, isEnabled, navigation]);

  return (
    <>
      <View style={styles.container}>
        {isRunning ? renderActiveButtons() : renderInactiveButtons()}
      </View>
    </>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default TimerControls;
