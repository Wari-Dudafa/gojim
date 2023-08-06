import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Alert,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Button from "./Button";

function ExerciseModifier(props) {
  const [swipeableRow, setSwipeableRow] = useState();
  const [name, setName] = useState();
  const [reps, setReps] = useState(1);
  const [sets, setSets] = useState(1);
  const index = props.index;
  const [isEnabled, setIsEnabled] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const deletingAnimationValue = useRef(new Animated.Value(1)).current;
  const dynamicStyle = {
    height: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 350],
    }),
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };
  const deletingStyle = {
    transform: [
      {
        scaleY: deletingAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        scaleX: deletingAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: deletingAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    margin: deletingAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["-16.1%", "0%"],
    }),
  };

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
          <Button
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={onPress}
          >
            <Text style={styles.rightActionText}>{text}</Text>
          </Button>
        </Animated.View>
      );
    };

    return (
      <View style={{ width: 192, flexDirection: "row-reverse" }}>
        {RenderRightAction("Delete", "#c24451", 128, progress, Delete)}
        {RenderRightAction("Edit", "#4490c2", 192, progress, ToggleEdit)}
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
    temp = [...props.exercises];
    temp[index].UpdateExercise({ name: name, reps: reps, sets: sets });
    props.setExercises(temp);
    setName();
    ToggleEdit();
  };

  const Delete = () => {
    Close();
    Alert.alert("Exercise deleted");
    const toValue = 0;
    Animated.spring(deletingAnimationValue, {
      toValue,
      speed: 5,
      bounciness: 5,
      useNativeDriver: false,
    }).start(() => {
      temp = [...props.exercises];
      temp[index] = null;
      props.setExercises(temp);
    });
  };

  const ToggleEdit = () => {
    Close();
    setName();
    setIsEnabled(!isEnabled);
    const toValue = isEnabled ? 0 : 1;
    if (isEnabled) {
      Animated.timing(animationValue, {
        toValue,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animationValue, {
        toValue,
        speed: 5,
        bounciness: 5,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Animated.View style={deletingStyle} shouldRasterizeIOS={true}>
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
            <Animated.View style={[{ flex: 1 }, dynamicStyle]}>
              <TextInput
                style={{
                  flex: 1,
                  color: "#e6e6e6",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 40,
                }}
                placeholder="Exercise name"
                value={name}
                onChangeText={setName}
              />

              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => setReps(reps + 1)}
                >
                  <Feather name="plus" size={30} color="#e6e6e6" />
                </Button>

                <Text style={{ padding: 10 }}>Reps: {reps}</Text>
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (reps - 1 >= 1) {
                      setReps(reps - 1);
                    }
                  }}
                >
                  <Feather name="minus" size={30} color="#e6e6e6" />
                </Button>
              </View>

              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => setSets(sets + 1)}
                >
                  <Feather name="plus" size={30} color="#e6e6e6" />
                </Button>
                <Text style={{ padding: 10 }}>Sets: {sets}</Text>
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (sets - 1 >= 1) {
                      setSets(sets - 1);
                    }
                  }}
                >
                  <Feather name="minus" size={30} color="#e6e6e6" />
                </Button>
              </View>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                  onPress={Edit}
                  title="save"
                  style={{
                    flex: 1,
                    backgroundColor: "#4490c2",
                    borderRadius: 10,
                    margin: 5,
                  }}
                ></Button>
                <Button
                  title="cancel"
                  onPress={ToggleEdit}
                  style={{
                    flex: 1,
                    backgroundColor: "#c24451",
                    borderRadius: 10,
                    margin: 5,
                  }}
                ></Button>
              </View>
            </Animated.View>
            <Image
              style={styles.image}
              source={require("../../assets/shading-1.png")}
              defaultSource={require("../../assets/shading-1.png")}
            />
          </View>
        </View>
      </Swipeable>
    </Animated.View>
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
    color: "lightgrey",
    fontSize: 20,
  },
  sets: {
    color: "lightgrey",
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
