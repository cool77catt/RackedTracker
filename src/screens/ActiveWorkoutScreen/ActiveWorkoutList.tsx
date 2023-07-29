import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const ActiveWorkoutList = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Button>Workout List</Button>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default ActiveWorkoutList;
