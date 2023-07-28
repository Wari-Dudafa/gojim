import { View, Text, StyleSheet } from "react-native";

function StartExercisePage(props) {
  const exercise = props.route.params.exercise;
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

export default StartExercisePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});
