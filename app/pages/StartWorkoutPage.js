import { View, FlatList } from "react-native";

import Button from "../components/Button";
import Database from "../classes/DatabaseClass";
import ExerciseStarter from "../components/ExerciseStarter";

function StartWorkoutPage(props) {
  const exercises = [
    { name: "exercise", reps: 12, sets: 3, id: 1 },
    { name: "exercise", reps: 12, sets: 3, id: 2 },
    { name: "exercise", reps: 12, sets: 3, id: 3 },
    { name: "exercise", reps: 12, sets: 3, id: 4 },
  ];
  const db = new Database();
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <Button
        title="End workout"
        onPress={() => {
          navigation.pop();
        }}
      />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseStarter exercise={item} navigation={props.navigation} />
        )}
      />
    </View>
  );
}

export default StartWorkoutPage;
