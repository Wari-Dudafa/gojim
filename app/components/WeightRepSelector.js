import { useState } from "react";
import { Text, View } from "react-native";
import SimplePicker from "react-native-simple-picker";

function WeightRepSelector(props) {
  const [simplePicker, setSimplePicker] = useState();
  const [repsDone, setRepsDone] = useState();
  const options = ["1", "2", "3", "4", "5"];

  const UpdateRef = (ref) => {
    setSimplePicker(ref);
  };

  const SimplePickerOnSubmit = (option) => {
    setRepsDone(option);
  };

  return (
    <View>
      <Text
        onPress={() => {
          simplePicker.show();
        }}
      >
        How many reps did you do?
      </Text>
      {repsDone ? <Text>{repsDone}</Text> : <></>}

      <SimplePicker
        ref={UpdateRef}
        options={options}
        onSubmit={SimplePickerOnSubmit}
      />
    </View>
  );
}

export default WeightRepSelector;
