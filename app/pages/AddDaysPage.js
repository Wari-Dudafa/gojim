import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

import Exercise from "../classes/ExerciseClass";

function AddDaysPage({ navigation, props }) {
  // Default exercise in a day
  let defaultExercise = new Exercise({});

  const [dayName, setDayName] = useState("");
  const [currentExercises, setCurrentExercise] = useState([defaultExercise]);

  function DisplayExercises() {
    // For each exercise in the array, an exercise selector component is rendered with the exercise passed into the render component as a prop
    return (
      <View>
        <Text>This will display the exercise selectors</Text>
      </View>
    );
  }

  const AddExercise = () => {
    console.log("New exercise added");
    // Duplicate state array
    // Append new exercise
    // Set temporary array to state array
  };

  const SaveDay = () => {
    console.log("New day added");
    // Adds exercise data from the array to the database
    // Adds day name to the database
    // User feedback
    // Close modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <TouchableOpacity style={{ backgroundColor: "red" }} onPress={SaveDay}>
        <Text>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "green" }}
        onPress={AddExercise}
      >
        <Text>+</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter the day name"
        value={dayName}
        onChangeText={setDayName}
      />

      <ScrollView>
        <DisplayExercises />
      </ScrollView>
    </View>
  );
}

export default AddDaysPage;
