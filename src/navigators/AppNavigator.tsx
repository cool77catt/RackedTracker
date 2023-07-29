import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as React from 'react';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Active Workout" component={ActiveWorkoutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
