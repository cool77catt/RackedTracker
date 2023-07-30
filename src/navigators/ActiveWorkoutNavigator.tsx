import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as React from 'react';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';
import TimerEditScreen from '../screens/TimerEditScreen';

const Stack = createNativeStackNavigator();

const ActiveWorkoutNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '', // This hides the title for all screens
      }}
    >
      <Stack.Screen
        name="Active Workout"
        component={ActiveWorkoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Edit Timer" component={TimerEditScreen} />
    </Stack.Navigator>
  );
};

export default ActiveWorkoutNavigator;
