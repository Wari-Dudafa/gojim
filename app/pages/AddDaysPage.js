import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import Exercise from "../classes/ExerciseClass";

function AddDaysPage({ navigation, props }) {
  const [dayName, setDayName] = useState("");
  const [currentExercises, setCurrentExercise] = useState([]);

  function DisplayExercises() {
    return (
      <View>
        <Text>
          This will display all the exercises using a map over an array of all
          the exercise objects
        </Text>
      </View>
    );
  }

  const AddExercise = () => {
    console.log("New exercise added");
    // Add functionality later
  };

  const SaveDay = () => {
    console.log("New day added");
    // Add functionality later
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

      <DisplayExercises />
    </View>
  );
}

export default AddDaysPage;
