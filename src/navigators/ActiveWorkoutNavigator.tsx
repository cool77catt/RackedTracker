import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { TimerProvider } from '../contexts';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';
import TimerEditScreen from '../screens/TimerEditScreen/TimerEditScreen';

const Stack = createNativeStackNavigator();

const ActiveWorkoutNavigator = () => {
  return (
    <TimerProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitle: '', // This hides the title for all screens
        }}
      >
        <Stack.Screen
          name="Active Workout"
          component={ActiveWorkoutScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Edit Timer"
          component={TimerEditScreen}
          options={({ navigation }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <Button
                labelStyle={styles.cancelButtonText}
                onPress={() => navigation.goBack()}
              >
                Cancel
              </Button>
            ),
          })}
        />
      </Stack.Navigator>
    </TimerProvider>
  );
};

const styles = StyleSheet.create({
  cancelButtonText: {
    fontSize: 16,
  },
});

export default ActiveWorkoutNavigator;
