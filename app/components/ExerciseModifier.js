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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useTheme } from "react-native-paper";

import Button from "./Button";

function ExerciseModifier(props) {
  const theme = useTheme();
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

  const BottomPadding = () => {
    if (props.index == props.lastIndex) {
      return <View style={{ height: 70 }} />;
    }
  };

  RenderRightActions = (progress) => {
    RenderRightAction = (text, color, x, progress, onPress, textColor) => {
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
            <Text style={[styles.rightActionText, { color: textColor }]}>
              {text}
            </Text>
          </Button>
        </Animated.View>
      );
    };

    return (
      <View style={{ width: 192, flexDirection: "row-reverse" }}>
        {props.delete
          ? RenderRightAction(
              "Delete",
              theme.colors.tertiary,
              128,
              progress,
              Delete,
              theme.colors.onTertiary
            )
          : null}
        {props.edit
          ? RenderRightAction(
              "Edit",
              theme.colors.secondary,
              192,
              progress,
              ToggleEdit,
              theme.colors.onSecondary
            )
          : null}
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
    <>
      <Animated.View style={deletingStyle} shouldRasterizeIOS>
        <Swipeable
          ref={UpdateRef}
          friction={2}
          rightThreshold={50}
          renderRightActions={RenderRightActions}
        >
          <View style={styles.container}>
            <View
              style={[
                styles.exerciseContainer,
                {
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.outline,
                },
              ]}
            >
              <Text style={[styles.name, { color: theme.colors.onPrimary }]}>
                {props.item.name}
              </Text>
              <Text style={[styles.reps, { color: theme.colors.onPrimary }]}>
                {props.item.reps} reps
              </Text>
              <Text style={[styles.sets, { color: theme.colors.onPrimary }]}>
                {props.item.sets} sets{" "}
              </Text>
              <Animated.View style={[{ flex: 1 }, dynamicStyle]}>
                <TextInput
                  style={{
                    flex: 1,
                    color: theme.colors.onPrimary,
                    textAlign: "center",
                    fontSize: 40,
                  }}
                  placeholder="Exercise name"
                  value={name}
                  onChangeText={setName}
                />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.onPrimary,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                    onPress={() => setReps(reps + 1)}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={theme.colors.primary}
                    />
                  </Button>

                  <Text style={{ padding: 10, fontSize: 20 }}>
                    Reps: {reps}
                  </Text>
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.onPrimary,
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
                    <MaterialCommunityIcons
                      name="minus"
                      size={30}
                      color={theme.colors.primary}
                    />
                  </Button>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.onPrimary,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                    onPress={() => setSets(sets + 1)}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={theme.colors.primary}
                    />
                  </Button>
                  <Text style={{ padding: 10, fontSize: 20 }}>
                    Sets: {sets}
                  </Text>
                  <Button
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.onPrimary,
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
                    <MaterialCommunityIcons
                      name="minus"
                      size={30}
                      color={theme.colors.primary}
                    />
                  </Button>
                </View>

                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Button
                    onPress={Edit}
                    title="save"
                    titleStyle={{
                      textAlign: "center",
                      color: theme.colors.onSecondary,
                      fontSize: 20,
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.secondary,
                      borderRadius: 10,
                      margin: 5,
                      justifyContent: "center",
                    }}
                  ></Button>
                  <Button
                    title="cancel"
                    onPress={ToggleEdit}
                    titleStyle={{
                      textAlign: "center",
                      color: theme.colors.onTertiary,
                      fontSize: 20,
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.tertiary,
                      borderRadius: 10,
                      margin: 5,
                      justifyContent: "center",
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
      <BottomPadding />
    </>
  );
}

export default ExerciseModifier;

const styles = StyleSheet.create({
  name: {
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
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 5,
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
    fontSize: 20,
    padding: 10,
  },
});
