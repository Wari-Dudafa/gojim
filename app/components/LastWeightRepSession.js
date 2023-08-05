import { View, StyleSheet, Text } from "react-native";

function LastWeightRepSession(props) {
  const weightUnit = "kg";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>12</Text>
      <Text style={styles.text}>15 {weightUnit}</Text>
    </View>
  );
}

export default LastWeightRepSession;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  text: {
    fontSize: 25,
  },
});
