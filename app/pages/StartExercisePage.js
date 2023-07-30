import { View, Text, StyleSheet } from "react-native";

import ExercisePillar from "../components/ExercisePillar";

function StartExercisePage(props) {
  const exercise = props.route.params.exercise;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          paddingBottom: 30,
        }}
      >
        <Text style={{ color: "#e6e6e6", fontWeight: 800, fontSize: 40 }}>
          {exercise.name}
        </Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <ExercisePillar
          headerText={"Last time"}
          editable={false}
          exercise={exercise}
        />
        <ExercisePillar
          headerText={"Today"}
          editable={true}
          exercise={exercise}
        />
      </View>

      <View style={{ height: 50 }}></View>
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
