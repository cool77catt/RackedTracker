import { Text } from 'react-native-paper';

function padded(num: number): string {
  return num.toString().padStart(2, '0');
}

export interface TimerTextProps {
  hours: number;
  minutes: number;
  seconds: number;
  textVariant?: React.ComponentProps<typeof Text>['variant'];
  textStyle?: React.ComponentProps<typeof Text>['style'];
}

const TimerText = ({
  hours,
  minutes,
  seconds,
  textVariant,
  textStyle,
}: TimerTextProps) => {
  return (
    <Text variant={textVariant} style={textStyle}>
      {`${padded(hours)}:${padded(minutes)}:${padded(seconds)}`}
    </Text>
  );
};

export default TimerText;
