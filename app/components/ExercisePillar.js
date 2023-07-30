import { View, Text, Image, StyleSheet } from "react-native";

import WeightRepSelector from "./WeightRepSelector";

function ExercisePillar(props) {
  return (
    <View style={styles.greenPillars}>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <Image
        style={styles.image}
        source={require("../../assets/shading.png")}
        defaultSource={require("../../assets/shading.png")}
      />
      {props.editable ? (
        <WeightRepSelector reps={props.exercise.reps} />
      ) : (
        <></>
      )}
    </View>
  );
}

export default ExercisePillar;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    color: "#e6e6e6",
    fontWeight: 600,
    fontSize: 30,
  },
  image: {
    position: "absolute",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
  greenPillars: {
    flex: 1,
    backgroundColor: "#93c244",
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    margin: 5,
  },
});
