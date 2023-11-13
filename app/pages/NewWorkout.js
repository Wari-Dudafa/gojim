import { useState } from "react";
import { View, Text, Alert } from "react-native";

import colours from "../utils/Colours";
import Workout from "../backend/Workout";
import exerciseNames from "../utils/ExerciseNames";
import WorkoutName from "../components/new-workout/WorkoutName";
import ExerciseList from "../components/new-workout/ExerciseList";

function NewWorkout(props) {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);

  const saveWorkout = () => {
    if (name.length == 0) {
      Alert.alert("Please type a workout name");
    } else {
      if (exercises.length == 0) {
        Alert.alert("Please add an exercise");
      } else {
        let newWorkout = new Workout(name);

        for (let index = 0; index < exercises.length; index++) {
          let exercise = exercises[index];
          newWorkout.addExercise(exercise.name, false);
        }

        setName("");
        setExercises([]);
        setExerciseName("");
        setSearchResults([]);
        Alert.alert("New workout created");
      }
    }
  };

  const handleExerciseNameChange = (text) => {
    let filteredExerciseNames = exerciseNames.filter((item) =>
      item.includes(text)
    );
    setExerciseName(text);
    if (text.length >= 2) {
      setSearchResults(filteredExerciseNames);
    } else {
      setSearchResults([]);
    }
    setNoSearchResults(filteredExerciseNames.length == 0);
  };

  const addToExercices = (name) => {
    let tempExercises = [...exercises];
    tempExercises.push({ name: name, timed: false });
    setExerciseName("");
    setSearchResults([]);
    setExercises(tempExercises);
  };

  const deleteExercise = (index) => {
    let tempExercises = [...exercises];
    tempExercises.splice(index, 1);
    setExercises(tempExercises);
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "quicksand-bold",
          color: colours.text,
          fontSize: 40,
          padding: 10,
        }}
      >
        New Workout
      </Text>

      <WorkoutName saveWorkout={saveWorkout} name={name} setName={setName} />

      <ExerciseList
        exercises={exercises}
        exerciseName={exerciseName}
        searchResults={searchResults}
        addToExercices={addToExercices}
        deleteExercise={deleteExercise}
        noSearchResults={noSearchResults}
        handleExerciseNameChange={handleExerciseNameChange}
      />
    </View>
  );
}

export default NewWorkout;
