import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import ExercisePillar from "../components/ExercisePillar";
import Button from "../components/Button";
import Database from "../classes/DatabaseClass";

function StartExercisePage(props) {
  const db = new Database();
  const exercise = props.route.params.exercise;
  // Makes empty arrays the length of the no of sets
  const [newReps, setNewReps] = useState(new Array(exercise.sets).fill("1"));
  const [newWeight, setNewWeight] = useState(
    new Array(exercise.sets).fill("2")
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
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
          newReps={newReps}
          setNewReps={setNewReps}
          newWeight={newWeight}
          setNewWeight={setNewWeight}
        />
      </View>

      <Button
        title="Done"
        onPress={() => {
          let proceed = true;
          // Makes sure there are no blanks
          for (let index = 0; index < newReps.length; index++) {
            if (!newReps[index] || !newWeight[index]) {
              proceed = false;
            }
          }
          if (proceed) {
            // Add the data from the arrays to the database
            props.navigation.pop();
          } else {
            Alert.alert(
              "Not complete",
              "If you cannt continue please fill in the blanks with 0's"
            );
          }
        }}
      />
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
