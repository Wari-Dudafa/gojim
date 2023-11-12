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

import Button from "./Button";
import colours from "../utils/Colours";
import StartExercise from "./StartExercise";
import springConfig from "../utils/SpringConfig";

function StartWorkout(props) {
  const zIndex = useSharedValue(0);
  const yPosition = useSharedValue(0);
  const [atTheTop, setAtTheTop] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const top = -screenHeight * 0.85;

  const toggleMenu = () => {
    if (atTheTop) {
      yPosition.value = withSpring(0, springConfig, () => {
        zIndex.value = 0;
      });
    } else {
      yPosition.value = withSpring(top, springConfig);
      zIndex.value = 10;
    }
    runOnJS(setAtTheTop)(!atTheTop);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      zIndex.value = 10;
    })
    .onChange((event) => {
      if (!atTheTop) {
        yPosition.value = event.translationY;
      }
    })
    .onFinalize((event) => {
      let arg = -event.translationY > screenHeight * 0.1;
      runOnJS(setAtTheTop)(arg);
      if (arg) {
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
        backgroundColor: colours.background,
        width: "100%",
        height: screenHeight * 1.5,
        position: "absolute",
        transform: [{ translateY: yPosition }],
        shadowColor: "black",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        zIndex: zIndex,
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
            <Text
              style={{
                padding: 10,
                fontFamily: atTheTop ? "quicksand-bold" : "quicksand",
                fontSize: atTheTop ? 40 : 25,
                color: atTheTop ? colours.primary : colours.text,
              }}
            >
              {props.currentWorkout
                ? props.currentWorkout.name
                : "No workout selected"}
            </Text>
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

        <Button
          icon={atTheTop ? "chevron-down" : "chevron-up"}
          iconSize={atTheTop ? 65 : 50}
          iconColor={colours.primary}
          onPress={() => {
            toggleMenu();
          }}
          style={{ paddingLeft: 5 }}
        />
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
