import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import Exercise from "../classes/ExerciseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";
import PlusButton from "../components/PlusButton";

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
    Alert.alert('New day added')
    // Close modal
    navigation.pop()
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.done} onPress={SaveDay}>
        <Text style={styles.done.text}>Done</Text>
      </TouchableOpacity>

      <PlusButton onPress={AddExercise} />

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
  done: {
    text:{
      color: "#e6e6e6",
      fontSize: 20,
    },
    backgroundColor: "red",
  },
  dayName: {
    fontSize: 55,
    color: "#e6e6e6",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});
