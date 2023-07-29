import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import ControlButton from './ControlButton';
import TimerEditModal from './TimerEditModal';

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

  const renderActiveButtons = useCallback(() => {
    return (
      <>
        {!isPaused ? (
          <ControlButton
            text="Pause"
            isEnabled={isEnabled}
            onPress={() => eventHandler?.(TimerControlsEventType.Pause)}
          />
        ) : (
          <ControlButton
            text="Resume"
            isEnabled={isEnabled}
            onPress={() => eventHandler?.(TimerControlsEventType.Resume)}
          />
        )}
        <ControlButton
          text="Stop"
          isEnabled={isEnabled}
          onPress={() => eventHandler?.(TimerControlsEventType.Stop)}
        />
      </>
    );
  }, [eventHandler, isEnabled, isPaused]);

  const renderInactiveButtons = useCallback(() => {
    return (
      <>
        <ControlButton
          text="Start"
          isEnabled={isEnabled}
          onPress={() => eventHandler?.(TimerControlsEventType.Start)}
        />
        <ControlButton text="Edit" isEnabled={isEnabled} />
      </>
    );
  }, [eventHandler, isEnabled]);

  return (
    <>
      <TimerEditModal visible={false} />
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
    },
  });
};

export default TimerControls;
