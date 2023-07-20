import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Exercise from "../classes/ExerciseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";

function AddDaysPage({ navigation, props }) {
  // Default exercise in a day
  const defaultExercise = new Exercise({
    name: "Exercise",
    reps: 1,
    sets: 1,
  });

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
    Alert.alert("New day added");
    navigation.pop();
    // Adds exercise data from the array to the database
    // Adds dayName to the database
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.plus} onPress={AddExercise}>
          <Feather name="plus" size={50} color="#e6e6e6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.check} onPress={SaveDay}>
          <Feather name="check" size={50} color="#e6e6e6" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.dayName}
        placeholder="Day name"
        value={dayName}
        onChangeText={setDayName}
      />

      <NewExerciseSelector exercises={exercises} setExercises={setExercises} />
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
    color: "#e6e6e6",
    marginLeft: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});
