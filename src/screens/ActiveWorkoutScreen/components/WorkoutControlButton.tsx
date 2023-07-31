import { useCallback } from 'react';
import { Button } from 'react-native-paper';

type WorkoutControlButtonProps = {
  workoutActive: boolean;
  onPress: (active: boolean) => void;
};

const WorkoutControlButton = (props: WorkoutControlButtonProps) => {
  const renderWorkoutControlButton = useCallback(
    (text: string, onPress: () => void) => {
      return (
        <Button uppercase={true} mode="contained" onPress={onPress}>
          {text}
        </Button>
      );
    },
    [],
  );

  if (props.workoutActive) {
    return renderWorkoutControlButton('Finish Workout', () =>
      props.onPress(false),
    );
  }
  return renderWorkoutControlButton('Start Workout', () => props.onPress(true));
};

export default WorkoutControlButton;
