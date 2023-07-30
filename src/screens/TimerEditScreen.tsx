import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const TimerEditScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Example Modal. Click outside this area to dismiss.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default TimerEditScreen;
