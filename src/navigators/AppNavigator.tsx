import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';

const AppNavigator = () => {
  const styles = useStyles();
  return (
    <View style={styles.mainContainer}>
      <ActiveWorkoutScreen />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      height: '100%',
    },
  });
};

export default AppNavigator;
