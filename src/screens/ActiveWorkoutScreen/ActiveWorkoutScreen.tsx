import { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ActiveWorkoutList from './components/ActiveWorkoutList';
import WorkoutControlButton from './components/WorkoutControlButton';
import { WorkoutTimers } from './components/WorkoutTimers';

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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.timersContainer}>
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
    </SafeAreaView>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      borderWidth: 1,
    },
    timersContainer: {
      height: 200,
      width: '100%',
      borderWidth: 1,
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
