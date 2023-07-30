import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as React from 'react';
import ActiveWorkoutNavigator from './ActiveWorkoutNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Active Workout Home"
        component={ActiveWorkoutNavigator}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
