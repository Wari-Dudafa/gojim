import { View, TextInput } from "react-native";

import Button from "../Button";
import colours from "../../utils/Colours";

function WorkoutName(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TextInput
        placeholder="Workout name"
        value={props.name}
        onChangeText={props.setName}
        style={{ padding: 10, fontSize: 30, color: colours.text }}
      />
      {props.name.length > 0 && props.exercises.length > 0 ? (
        <Button
          icon={"content-save"}
          iconColor={colours.primary}
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            props.saveWorkout(0);
          }}
        />
      ) : null}
    </View>
  );
}

export default WorkoutName;
