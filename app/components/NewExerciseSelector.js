import { StyleSheet, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ExerciseModifier from "./ExerciseModifier";

function NewExerciseSelector(props) {
  // For each exercise in the array, an exercise selector component is rendered

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={props.exercises}
        renderItem={({ item, index }) => (
          <ExerciseModifier
            item={item}
            index={index}
            key={index}
            exercises={props.exercises}
            setExercises={props.setExercises}
          />
        )}
      />
    </GestureHandlerRootView>
  );
}

export default NewExerciseSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
