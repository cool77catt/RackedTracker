import { Button } from 'react-native-paper';

type ControlButtonProps = {
  text: string;
  isEnabled: boolean;
  onPress?: () => void;
};

const ControlButton = ({ text, isEnabled, onPress }: ControlButtonProps) => {
  return (
    <Button disabled={!isEnabled} onPress={onPress}>
      {text}
    </Button>
  );
};

export default ControlButton;
