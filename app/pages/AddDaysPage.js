import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import Exercise from "../classes/ExerciseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

function AddDaysPage(props) {
  const theme = useTheme();
  // Default exercise in a day
  const defaultExercise = new Exercise({
    name: "Exercise",
    reps: 1,
    sets: 1,
  });
  const db = new Database();
  const [dayName, setDayName] = useState("");
  const [exercises, setExercises] = useState([defaultExercise]);

  const AddExercise = () => {
    // Create a new array with the existing exercises and the new exercise
    let newExcercise = new Exercise({
      name: "New Exercise",
      reps: 1,
      sets: 1,
    });
    const updatedExercises = [...exercises, newExcercise];
    // Update the state with the new array
    setExercises(updatedExercises);
  };

  const SaveDay = () => {
    let checker = [];
    let proceed = false;
    if (dayName.length == 0) {
      Alert.alert("Please type a day name");
      return;
    }
    for (let index = 0; index < exercises.length; index++) {
      let exercise = exercises[index];
      if (exercise == null) {
        checker.push(false);
      } else {
        checker.push(true);
      }
    }
    for (let index = 0; index < checker.length; index++) {
      let check = checker[index];
      if (check) {
        proceed = true;
      }
    }
    if (!proceed) {
      Alert.alert("Please add an exercise");
      return;
    }
    props.navigation.pop();

    // Adds exercise data from the array to the database
    // Adds dayName to the database
    let statement = "INSERT INTO days (name) VALUES('" + dayName + "')";
    db.sql(statement, (resultSet) => {
      let day_id = resultSet.insertId;

      for (let index = 0; index < exercises.length; index++) {
        let exercise = exercises[index];
        if (exercise != null) {
          statement =
            "INSERT INTO exercises (name, reps, sets, day_id) VALUES('" +
            exercise.name +
            "', " +
            exercise.reps +
            ", " +
            exercise.sets +
            ", " +
            day_id +
            ")";
          db.sql(statement, () => {});
        }
      }
      Alert.alert("New day added");
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar navigation={props.navigation} back />

      <TextInput
        style={[styles.dayName, { color: theme.colors.onBackground }]}
        placeholder="Day name"
        value={dayName}
        onChangeText={setDayName}
      />

      <NewExerciseSelector
        edit
        delete
        exercises={exercises}
        setExercises={setExercises}
      />

      <SafeAreaView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Button style={styles.plus} onPress={AddExercise}>
          <MaterialCommunityIcons
            name="plus"
            size={50}
            color={theme.colors.onBackground}
          />
        </Button>

        <Button style={styles.check} onPress={SaveDay}>
          <MaterialCommunityIcons
            name="check"
            size={50}
            color={theme.colors.onBackground}
          />
        </Button>
      </SafeAreaView>
    </View>
  );
}

export default AddDaysPage;

const styles = StyleSheet.create({
  check: {
    marginTop: 10,
    marginRight: 10,
  },
  plus: {
    marginTop: 10,
    marginLeft: 10,
  },
  dayName: {
    fontSize: 55,
    marginLeft: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
});
