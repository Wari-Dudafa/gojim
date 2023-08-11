import { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useTheme } from "react-native-paper";

function WeightRepSelector(props) {
  const theme = useTheme();
  const [repsDone, setRepsDone] = useState("");
  const [weight, setWeight] = useState("");
  const repCharacterLimit = 3;
  const [progress, setProgress] = useState(false);
  const [tooManyRepsChecker, setTooManyRepsChecker] = useState(true);
  const weightCharacterLimit = 6;

  const onChanged = (text, value) => {
    let tempText = text;
    let newLetter = tempText.charAt(tempText.length - 1);
    let numbers = "0123456789.";
    let tempArray;

    if (numbers.includes(newLetter)) {
      // New letter typed is a number
      if (value == "reps") {
        setRepsDone(tempText);
        tempArray = props.newReps;
        tempArray[props.index] = tempText;
        props.setNewReps(tempArray);
      } else {
        setWeight(tempText);
        tempArray = props.newWeight;
        tempArray[props.index] = tempText;
        props.setNewWeight(tempArray);
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
    tooManyReps();
    if (!props.lastWeightRepSession[props.index]) return;
    if (props.lastWeightRepSession.length > 0) {
      if (
        parseFloat(weight) >
        props.lastWeightRepSession[props.index].weight_in_set
      ) {
        setProgress(true);
      } else {
        setProgress(false);
      }
    }
  };

  const tooManyReps = () => {
    if (repsDone > props.exercise.reps && tooManyRepsChecker) {
      // You’ve done a lot of reps, try increasing the weight
      Alert.alert("You’ve done a lot of reps, try increasing the weight");
      setTooManyRepsChecker(false);
    }
  };

  return (
    <>
      {progress ? (
        <>
          <View
            style={[
              styles.container,
              { borderBottomColor: theme.colors.secondary },
            ]}
          >
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
          <View
            style={[
              styles.container,
              { borderBottomColor: theme.colors.tertiary },
            ]}
          >
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
