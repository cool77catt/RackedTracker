import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActiveWorkoutList from './ActiveWorkoutList';
import WorkoutControlButton from './WorkoutControlButton';
import { WorkoutTimers } from './WorkoutTimers';

const ActiveWorkoutScreen = () => {
  const [workoutActive, setWorkoutActive] = useState(false);
  const styles = useStyles();

  const workoutControlButtonPressed = useCallback((active: boolean) => {
    if (active) {
      setWorkoutActive(true);
    } else {
      setWorkoutActive(false);
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stopwatchContainer}>
        <WorkoutTimers isEnabled={workoutActive} />
      </View>
      <View style={styles.listContainer}>
        <ActiveWorkoutList />
      </View>
      <View style={styles.workoutControlsContainer}>
        <WorkoutControlButton
          workoutActive={workoutActive}
          onPress={workoutControlButtonPressed}
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
      height: 200,
      width: '100%',
    },
    listContainer: {
      flex: 1,
      width: '100%',
    },
    workoutControlsContainer: {
      padding: 8,
      width: '90%',
    },
  });
};

export default ActiveWorkoutScreen;
