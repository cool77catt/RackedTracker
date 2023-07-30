import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { ScrollPickerProps } from 'react-native-wheel-scrollview-picker';
import Picker, { PickerHeight } from './Picker';

function formatTime(seconds: number): string {
  const minsString = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secsString = (seconds % 60).toString().padStart(2, '0');
  return `${minsString}:${secsString}`;
}

const TimerEditScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = useStyles({ cardBackgroundColor: theme.colors.background });
  const [minutesIndex, setMinutesIndex] = useState(1);
  const [secondsIndex, setSecondsIndex] = useState(0);
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i);
  const secondsOptions = Array.from({ length: 60 }, (_, i) => i);

  const presetTimes = [30, 60, 90, 120, 150, 180];

  return (
    <View style={styles.container}>
      <View style={styles.layoutQuickSetContainer}>
        <Card mode="elevated" elevation={5} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.headerContainer}>
              Quick Set
            </Text>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
              {presetTimes.map((time, idx) => (
                <Button
                  key={idx}
                  mode="outlined"
                  style={styles.presetButton}
                  onPress={() => {
                    // Set the new value
                    console.log('new value: ', time);
                    navigation.goBack();
                  }}
                >
                  {formatTime(time)}
                </Button>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.layoutManualSetContainer}>
        <View style={styles.pickerRowContainer}>
          <Picker
            items={minutesOptions}
            selectedIndex={minutesIndex}
            suffix="minutes"
            onValueChange={(
              data: ScrollPickerProps['dataSource'][0],
              selectedIndex: number,
            ) => {
              setMinutesIndex(selectedIndex);
              console.log('Selected minutes: ', data);
            }}
          />
          <Picker
            items={secondsOptions}
            selectedIndex={secondsIndex}
            suffix="seconds"
            onValueChange={(
              data: ScrollPickerProps['dataSource'][0],
              selectedIndex: number,
            ) => {
              setSecondsIndex(selectedIndex);
              console.log('Selected seconds: ', data);
            }}
          />
        </View>
        <Button
          mode="contained"
          style={styles.setButton}
          onPress={() => {
            const minutes = minutesOptions[minutesIndex];
            const seconds = secondsOptions[secondsIndex];
            const totalSeconds = minutes * 60 + seconds;
            console.log('set timer to: ', totalSeconds);
            navigation.goBack();
          }}
        >
          Set
        </Button>
      </View>
      {/* {presetTimes.map((time) => (
        <Button key={time} mode="contained">
          {time}
        </Button>
      ))} */}
    </View>
  );
};

type styleProps = {
  cardBackgroundColor: string;
};

const useStyles = ({ cardBackgroundColor }: styleProps) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      margin: 8,
    },
    layoutQuickSetContainer: {
      flex: 1,
      position: 'absolute',
      zIndex: 1,
    },
    layoutManualSetContainer: {
      flex: 7,
      justifyContent: 'center',
    },
    card: {
      backgroundColor: cardBackgroundColor,
    },
    headerContainer: {
      margin: 8,
    },
    horizontalScroll: {
      maxHeight: 50,
    },
    pickerRowContainer: {
      flexDirection: 'row',
      marginTop: 8,
      height: PickerHeight,
    },
    presetButton: {
      marginRight: 4,
      borderRadius: 12,
    },
    setButton: {
      marginTop: 24,
    },
  });
};

export default TimerEditScreen;
