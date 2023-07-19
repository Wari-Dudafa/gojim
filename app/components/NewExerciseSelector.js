import { View, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ExerciseModifier from "./ExerciseModifier";

function NewExerciseSelector(props) {
  // For each exercise in the array, an exercise selector component is rendered

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {props.exercises.map((item, index) => {
          return <ExerciseModifier item={item} index={index} key={index} />;
        })}
        <View style={{ height: 100 }} />
      </ScrollView>
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
