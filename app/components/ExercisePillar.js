import { View, Text, Image, StyleSheet, FlatList } from "react-native";

import WeightRepSelector from "./WeightRepSelector";
import LastWeightRepSession from "./LastWeightRepSession";

function ExercisePillar(props) {
  const WeightRepSelectorRenderer = () => {
    let setCount = props.exercise.sets;
    let repCount = props.exercise.reps;
    let weightRepSelectorArray = new Array(setCount).fill({});
    return (
      <FlatList
        style={{ flex: 1 }}
        data={weightRepSelectorArray}
        renderItem={({ index }) => {
          return (
            <>
              <WeightRepSelector
                repCount={repCount}
                key={index}
                index={index}
                newReps={props.newReps}
                setNewReps={props.setNewReps}
                newWeight={props.newWeight}
                setNewWeight={props.setNewWeight}
              />
            </>
          );
        }}
      />
    );
  };

  return (
    <View style={styles.greenPillars}>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.underline} />
      </View>
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />
      {props.editable ? (
        <WeightRepSelectorRenderer />
      ) : (
        <>
          <LastWeightRepSession />
          <LastWeightRepSession />
          <LastWeightRepSession />
        </>
      )}
    </View>
  );
}

export default ExercisePillar;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    color: "#e6e6e6",
    fontWeight: 600,
    fontSize: 30,
  },
  underline: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    height: 4,
    width: "90%",
  },
  image: {
    position: "absolute",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
  greenPillars: {
    flex: 1,
    backgroundColor: "#93c244",
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    margin: 5,
  },
});
