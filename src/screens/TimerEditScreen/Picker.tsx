import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

export const PickerHeight = 220;

type PickerProps = {
  items: number[];
  selectedIndex: number;
  suffix?: string;
  onValueChange?: React.ComponentProps<typeof ScrollPicker>['onValueChange'];
};

const Picker = ({
  items,
  selectedIndex,
  suffix,
  onValueChange,
}: PickerProps) => {
  const theme = useTheme();

  return (
    <View style={styles.pickerContainer}>
      <ScrollPicker
        dataSource={items}
        selectedIndex={selectedIndex}
        onValueChange={onValueChange}
        renderItem={(data, _, isSelected) => {
          return <Text>{`${data} ${isSelected ? suffix : ''}`}</Text>;
        }}
        wrapperHeight={PickerHeight}
        wrapperBackground={theme.colors.background}
        itemHeight={45}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    height: '100%',
    margin: 8,
    borderWidth: 1,
  },
});

export default Picker;
