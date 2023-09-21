import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

function LastWeightRepSession(props) {
  const theme = useTheme();
  const weightUnit = "kg";

  return (
    <View
      style={[styles.container, { borderBottomColor: theme.colors.outline }]}
    >
      <Text style={[styles.text, { color: theme.colors.onPrimary }]}>
        {props.reps}
      </Text>
      <Text style={[styles.text, , { color: theme.colors.onPrimary }]}>
        {props.weight} {weightUnit}
      </Text>
    </View>
  );
}

export default LastWeightRepSession;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  text: {
    fontSize: 25,
  },
});
