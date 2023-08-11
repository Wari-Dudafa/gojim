import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import Exercise from "../classes/ExerciseClass";
import Database from "../classes/DatabaseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

function EditDayPage(props) {
  const theme = useTheme();
  const db = new Database();
  const day = props.route.params.day;
  const [newName, setNewName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [secondaryExercises, setSecondaryExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = () => {
    let statement = "SELECT * FROM exercises WHERE day_id = " + day.id;
    db.sql(statement, (resultSet) => {
      let temp = [...resultSet.rows._array];
      let newArray = [];
      for (let index = 0; index < temp.length; index++) {
        let exercise = new Exercise(temp[index]);
        newArray.push(exercise);
      }
      setExercises(newArray);
      setSecondaryExercises(newArray);
    });
  };

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
    props.navigation.pop();

    if (newName.length > 0) {
      // Update day name
      let statement =
        "UPDATE days SET name = '" + newName + "' WHERE id = " + day.id;
      db.sql(statement, (resultSet) => {});
    }

    // Loop over og array and if it doesn't already exist, save it
    let oldExercisesLimitIndex = secondaryExercises.length; // Any item at an array location bigger or equal to this is a new item

    for (let index = 0; index < exercises.length; index++) {
      let exercise = exercises[index];
      // If it is now null check what it was the the secondaryExercise array
      if (exercise == null) {
        // Grab that id and delete that exercise from the database
        exercise = secondaryExercises[index];
        statement = "DELETE FROM exercises WHERE id = " + exercise.id;
        db.sql(statement, (resultSet) => {});
      }
      if (index >= oldExercisesLimitIndex) {
        // Add new exercise to the database
        statement =
          "INSERT INTO exercises (name, reps, sets, day_id) VALUES('" +
          exercise.name +
          "', " +
          exercise.reps +
          ", " +
          exercise.sets +
          ", " +
          day.id +
          ")";
        db.sql(statement, () => {});
      }
    }
  };

  const DeleteDay = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this day?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            // Delete the day from the database
            let statement = "DELETE FROM days WHERE id = " + day.id;
            db.sql(statement, (resultSet) => {
              // Delete all exercises with this day id
              let statement = "DELETE FROM exercises WHERE day_id = " + day.id;
              db.sql(statement, (resultSet) => {});
            });
            props.navigation.pop();
            Alert.alert("Day Deleted");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar navigation={props.navigation} back={true} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button style={styles.plus} onPress={AddExercise}>
          <Feather name="plus" size={50} color={theme.colors.onBackground} />
        </Button>

        <Button style={styles.plus} onPress={DeleteDay}>
          <Feather name="trash" size={45} color={theme.colors.onBackground} />
        </Button>

        <Button style={styles.check} onPress={SaveDay}>
          <Feather name="check" size={50} color={theme.colors.onBackground} />
        </Button>
      </View>

      <TextInput
        style={[styles.dayName, { color: theme.colors.onBackground }]}
        placeholder={day.name}
        value={newName}
        onChangeText={setNewName}
      />

      <NewExerciseSelector exercises={exercises} setExercises={setExercises} />
    </View>
  );
}

export default EditDayPage;

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
