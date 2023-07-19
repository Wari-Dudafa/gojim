import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

function ExerciseModifier(props) {
  const [swipeableRow, setSwipeableRow] = useState();
  const [name, setName] = useState("Squats");
  const [reps, setReps] = useState(6);
  const [sets, setSets] = useState(4);
  const index = props.index;

  if (props.item == null) return;

  RenderRightActions = (progress) => {
    RenderRightAction = (text, color, x, progress, onPress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });

      return (
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: 0 }],
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={onPress}
          >
            <Text style={styles.rightActionText}>{text}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <View style={{ width: 192, flexDirection: "row-reverse" }}>
        {RenderRightAction("Delete", "#c24451", 128, progress, Delete)}
        {RenderRightAction("Edit", "#4490c2", 192, progress, Edit)}
      </View>
    );
  };

  const UpdateRef = (ref) => {
    setSwipeableRow(ref);
  };

  const Close = () => {
    if (swipeableRow) {
      swipeableRow.close();
    }
  };

  const Edit = () => {
    Close();
    temp = [...props.exercises];
    temp[index].UpdateExercise({ name: name, reps: reps, sets: sets });
    props.setExercises(temp);
    Alert.alert("Exercise edited");
  };

  const Delete = () => {
    Close();
    temp = [...props.exercises];
    temp[index] = null;
    props.setExercises(temp);
    Alert.alert("Exercise deleted");
  };

  return (
    <Swipeable
      ref={UpdateRef}
      friction={2}
      rightThreshold={50}
      renderRightActions={RenderRightActions}
    >
      <View style={styles.container}>
        <View style={styles.exerciseContainer}>
          <Text style={styles.name}>{props.item.name}</Text>
          <Text style={styles.reps}>{props.item.reps} reps</Text>
          <Text style={styles.sets}>{props.item.sets} sets </Text>
          <Image
            style={styles.image}
            source={require("../../assets/shading.png")}
          />
        </View>
      </View>
    </Swipeable>
  );
}

export default ExerciseModifier;

const styles = StyleSheet.create({
  name: {
    color: "#e6e6e6",
    fontWeight: 800,
    fontSize: 40,
  },
  reps: {
    color: "#e6e6e6",
    fontSize: 20,
  },
  sets: {
    color: "#e6e6e6",
    fontSize: 20,
  },
  exerciseContainer: {
    flex: 1,
    backgroundColor: "#93c244",
    borderColor: "#2e476b",
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 2,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    resizeMode: "stretch",
    opacity: 0.05,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    zIndex: -1,
  },
  container: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  rightAction: {
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  rightActionText: {
    color: "#e6e6e6",
    fontSize: 20,
    padding: 10,
  },
});
