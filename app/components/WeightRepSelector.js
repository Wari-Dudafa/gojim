import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import SimplePicker from "react-native-simple-picker";
import { Feather } from "@expo/vector-icons";

import Button from "./Button";

function WeightRepSelector(props) {
  const [simplePicker, setSimplePicker] = useState();
  const [repsDone, setRepsDone] = useState();
  const [repOptions, setRepOptions] = useState([]);

  useEffect(() => {
    props.repCount;
    let tempRepOptions = [];
    let pushYourSelfFactor = 0.2;
    let extraReps = parseInt(props.repCount * pushYourSelfFactor);
    for (let index = 1; index < props.repCount + extraReps + 1; index++) {
      tempRepOptions.push(index.toString());
    }
    setRepOptions(tempRepOptions);
  }, []);

  const UpdateRef = (ref) => {
    setSimplePicker(ref);
  };

  const SimplePickerOnSubmit = (option) => {
    setRepsDone(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.reps}>
        <Text>Reps:</Text>
        {repsDone ? (
          <Button
            style={{}}
            onPress={() => {
              simplePicker.show();
            }}
          >
            <Text>{repsDone}</Text>
          </Button>
        ) : (
          <Button
            style={{}}
            onPress={() => {
              simplePicker.show();
            }}
          >
            <Feather name="chevron-down" size={30} color="#e6e6e6" />
          </Button>
        )}
      </View>

      <SimplePicker
        ref={UpdateRef}
        options={repOptions}
        onSubmit={SimplePickerOnSubmit}
      />
    </View>
  );
}

export default WeightRepSelector;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  reps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
