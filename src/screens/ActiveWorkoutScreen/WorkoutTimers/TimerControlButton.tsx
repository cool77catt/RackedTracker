import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type TimerControlButtonProps = {
  text: string;
  isEnabled: boolean;
  icon?: React.ComponentProps<typeof Button>['icon'];
  onPress?: () => void;
};

const TimerControlButton = ({
  text,
  isEnabled,
  icon,
  onPress,
}: TimerControlButtonProps) => {
  return (
    <Button
      disabled={!isEnabled}
      mode={'contained-tonal'}
      icon={icon}
      onPress={onPress}
      style={styles.button}
    >
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    // backgroundColor: 'red',
  },
});

export default TimerControlButton;
