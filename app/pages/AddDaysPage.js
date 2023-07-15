import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Exercise from "../classes/ExerciseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";

function AddDaysPage({ navigation, props }) {
  // Default exercise in a day
  const defaultExercise = new Exercise({
    name: "Bench Press",
    reps: 12,
    sets: 3,
  });

  const [dayName, setDayName] = useState("");
  const [exercises, setExercises] = useState([defaultExercise]);

  const AddExercise = () => {
    // Create a new array with the existing exercises and the new exercise
    const updatedExercises = [...exercises, defaultExercise];
    // Update the state with the new array
    setExercises(updatedExercises);
  };

  const SaveDay = () => {
    // Adds exercise data from the array to the database
    // Adds day name to the database
    // User feedback
    Alert.alert("New day added");
    // Close modal
    navigation.pop();
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
