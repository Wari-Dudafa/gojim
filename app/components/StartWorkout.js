import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
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

import colours from "../utils/colours";
import Button from "./Button";

function StartWorkout(props) {
  const screenHeight = Dimensions.get("window").height;
  const yPosition = useSharedValue(0);
  const [atTheTop, setAtTheTop] = useState(false);
  const top = -screenHeight * 0.85;
  const zIndex = useSharedValue(0);
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

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
                color: colours.text,
              }}
            >
              No workout selected
            </Text>
          </GestureDetector>
        </GestureHandlerRootView>
        <Button
          icon={"stop-circle-outline"}
          iconSize={atTheTop ? 65 : 50}
          iconColor={colours.primary}
        />
        <Button
          icon={
            atTheTop
              ? "chevron-down-circle-outline"
              : "chevron-up-circle-outline"
          }
          iconSize={atTheTop ? 65 : 50}
          iconColor={colours.primary}
          onPress={() => {
            toggleMenu();
          }}
          style={{ paddingLeft: 5 }}
        />
      </View>
    </Animated.View>
  );
}

export default StartWorkout;
