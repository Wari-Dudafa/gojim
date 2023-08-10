import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useTheme } from "react-native-paper";

import ExercisePillar from "../components/ExercisePillar";
import Button from "../components/Button";
import Database from "../classes/DatabaseClass";
import AppBar from "../components/AppBar";

function StartExercisePage(props) {
  const theme = useTheme();
  const db = new Database();
  const exercise = props.route.params.exercise;
  // Makes empty arrays the length of the no of sets
  const [newReps, setNewReps] = useState(new Array(exercise.sets).fill(""));
  const [newWeight, setNewWeight] = useState(new Array(exercise.sets).fill(""));

  const doneButtonPressed = () => {
    let checker = [];
    // Makes sure there are no blanks
    for (let index = 0; index < newReps.length; index++) {
      if (newReps[index].length > 0 && newWeight[index].length > 0) {
        checker.push(true);
      } else {
        checker.push(false);
      }
    }
    if (checker.includes(false)) {
      Alert.alert("Not complete", "Please enter reps done and weight lifted");
    } else {
      addData();
      props.navigation.pop();
    }
  };

  const addData = () => {
    // Add the data from the arrays to the database
    for (let index = 0; index < newReps.length; index++) {
      let date = new Date();
      let exerciseId = exercise.id;
      let reps = newReps[index];
      let weight = newWeight[index];
      // Grab session ID
      let statement = "SELECT MAX(id) AS max_id FROM session";
      db.sql(statement, (resultSet) => {
        let sessionId = resultSet.rows._array[0].max_id;
        let statement =
          "INSERT INTO sets (date, session_id, exercise_id) VALUES('" +
          date +
          "', " +
          sessionId +
          ", " +
          exerciseId +
          ")";
        db.sql(statement, (resultSet) => {
          // Save set id
          let setId = resultSet.insertId;

          // Add reps
          statement =
            "INSERT INTO reps_per_set (sets_id, rep_count) VALUES (" +
            setId +
            ", " +
            reps +
            ")";

          db.sql(statement, () => {});

          // Add weight
          statement =
            "INSERT INTO weight_per_set (sets_id, weight_kg, weight_lbs) VALUES (" +
            setId +
            ", " +
            weight +
            ", " +
            weight + // lbs support planned but not coming out right now
            ")";

          db.sql(statement, () => {});
        });
      });
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar navigation={props.navigation} back={true} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: theme.colors.onBackground,
            fontWeight: 800,
            fontSize: 40,
          }}
        >
          {exercise.name}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ExercisePillar
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
          doneButtonPressed();
        }}
      />
      <View style={{height: 30}}></View>
    </View>
  );
}

export default StartExercisePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
