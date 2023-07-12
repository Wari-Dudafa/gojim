import { View, TextInput } from "react-native";

function NewExerciseSelector(props) {
  // On text change, run an exercise method that updates the values
  // If the variable is passed by reference- this should work
  return (
    <View>
      <TextInput value={props.exercise.name} />
      <TextInput value={props.exercise.reps} />
      <TextInput value={props.exercise.sets} />
    </View>
  );
}

export default NewExerciseSelector;
