import { useState } from "react";
import { View, TextInput, Text } from "react-native";

import Button from "../components/Button";
import colours from "../utils/colours";
import Workout from "../backend/Workout";

function NewWorkout(props) {
  const [name, setName] = useState("");
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
        {props.header}
      </Text>
      <TextInput
        placeholder="Workout name"
        value={name}
        onChangeText={setName}
        style={{ padding: 10, fontSize: 30, color: colours.text }}
      />
      <Button
        text={"Done"}
        style={{ width: 60, height: 60, backgroundColor: colours.primary }}
        onPress={() => {
          let newWorkout = new Workout(name);
        }}
      ></Button>
    </View>
  );
}

export default NewWorkout;
