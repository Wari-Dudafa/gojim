import { useState } from "react";
import { View, Text, Dimensions, Alert, ScrollView } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

import Button from "../Button";
import colours from "../../utils/Colours";
import StartExercise from "./StartExercise";
import springConfig from "../../utils/SpringConfig";

function StartWorkout(props) {
  const zIndex = useSharedValue(0);
  const yPosition = useSharedValue(0);
  const notWorkingOutMessage = "Not working out";
  const [atTheTop, setAtTheTop] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const top = -screenHeight * 0.85;
  const swipeThreshold = screenHeight * 0.1;

  const pan = Gesture.Pan()
    .onBegin(() => {
      zIndex.value = 10;
    })
    .onChange((event) => {
      if (atTheTop) {
        // Top is already negative
        yPosition.value = top + event.translationY;
      } else {
        yPosition.value = event.translationY;
      }
    })
    .onFinalize((event) => {
      let atTheBottom = -event.translationY > swipeThreshold;
      runOnJS(setAtTheTop)(atTheBottom);

      if (atTheBottom) {
        // Bring it to the top
        yPosition.value = withSpring(top, springConfig);
      } else {
        yPosition.value = withSpring(0, springConfig, () => {
          zIndex.value = 0;
        });
      }
    });

  return (
    <Animated.View
      style={{
        zIndex: zIndex,
        width: "100%",
        position: "absolute",
        shadowColor: "black",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        height: screenHeight * 1.5,
        transform: [{ translateY: yPosition }],
        backgroundColor: colours.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          padding: 5,
        }}
      >
        <GestureHandlerRootView
          style={{
            backgroundColor: colours.background,
            flex: 1,
          }}
        >
          <GestureDetector gesture={pan}>
            <View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 7,
                    borderRadius: 50,
                    marginVertical: 5,
                    backgroundColor: colours.primary,
                  }}
                />
              </View>
              <Text
                style={{
                  padding: 10,
                  fontSize: atTheTop ? 40 : 25,
                  color: atTheTop ? colours.primary : colours.text,
                  fontFamily: atTheTop ? "quicksand-bold" : "quicksand",
                }}
              >
                {props.currentWorkout
                  ? props.currentWorkout.name
                  : notWorkingOutMessage}
              </Text>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
        {props.currentWorkout ? (
          <Button
            icon={"stop"}
            iconSize={atTheTop ? 55 : 50}
            iconColor={colours.primary}
            onPress={() => {
              Alert.alert(
                "Confirmation",
                "Are you finished with your workout?",
                [
                  { text: "No", style: "cancel" },
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                      props.setCurrentWorkout(null);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        ) : null}
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {props.currentWorkout
          ? props.currentWorkout
              .getExercises()
              .map((item, index) => (
                <StartExercise key={index} exercise={item} />
              ))
          : null}
      </ScrollView>
    </Animated.View>
  );
}

export default StartWorkout;
