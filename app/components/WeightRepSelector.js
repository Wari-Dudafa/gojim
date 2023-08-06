import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

function WeightRepSelector(props) {
  const [repsDone, setRepsDone] = useState("");
  const [weight, setWeight] = useState("");
  const repCharacterLimit = 3;
  const [progress, setProgress] = useState(false);
  const weightCharacterLimit = 4;
  const productOfPreviousSessionsRepsAndWeight = 180;

  const onChanged = (text, value) => {
    let tempText = text;
    let newLetter = tempText.charAt(tempText.length - 1);
    let numbers = "0123456789";
    if (numbers.includes(newLetter)) {
      // New letter typed is a number
      if (value == "reps") {
        setRepsDone(tempText);
      } else {
        setWeight(tempText);
      }
    } else {
      // It isn't
      tempText = tempText.slice(0, -1);
      if (value == "reps") {
        setRepsDone(tempText);
      } else {
        setWeight(tempText);
      }
    }
  };

  const borderBottomColor = () => {
    if (
      parseInt(weight) * parseInt(repsDone) >=
      productOfPreviousSessionsRepsAndWeight
    ) {
      setProgress(true);
    } else {
      setProgress(false);
    }
  };

  return (
    <>
      {progress ? (
        <>
          <View style={[styles.container, { borderBottomColor: "#4490c2" }]}>
            <TextInput
              style={styles.inputNumber}
              placeholder="reps"
              keyboardType="numeric"
              maxLength={repCharacterLimit}
              value={repsDone}
              onChangeText={(text) => onChanged(text, "reps")}
              onEndEditing={borderBottomColor}
            />
            <TextInput
              style={styles.inputNumber}
              placeholder="weight"
              keyboardType="numeric"
              maxLength={weightCharacterLimit}
              value={weight}
              onChangeText={(text) => onChanged(text, "weight")}
              onEndEditing={borderBottomColor}
            />
          </View>
        </>
      ) : (
        <>
          <View style={[styles.container, { borderBottomColor: "#c24451" }]}>
            <TextInput
              style={styles.inputNumber}
              placeholder="reps"
              keyboardType="numeric"
              maxLength={repCharacterLimit}
              value={repsDone}
              onChangeText={(text) => onChanged(text, "reps")}
              onEndEditing={borderBottomColor}
            />
            <TextInput
              style={styles.inputNumber}
              placeholder="weight"
              keyboardType="numeric"
              maxLength={weightCharacterLimit}
              value={weight}
              onChangeText={(text) => onChanged(text, "weight")}
              onEndEditing={borderBottomColor}
            />
          </View>
        </>
      )}
    </>
  );
}

export default WeightRepSelector;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  inputNumber: {
    fontSize: 25,
  },
});
