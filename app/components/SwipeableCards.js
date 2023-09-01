import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Card from "./Card.js";
import DayPageButtons from "./DayPageButtons.js";

function SwipeableCards(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const pressed = useSharedValue(false);
  const [activeCard, setActiveCard] = useState(0);

  const [mainDay, setMainDay] = useState(props.days[activeCard]);
  const [leftDay, setLeftDay] = useState(props.days[activeCard]);
  const [rightDay, setRightDay] = useState(props.days[activeCard]);

  const swipeThreshold = screenWidth * 0.35;

  const mainHorizontalOffset = useSharedValue(0, false);
  const mainRotationOffset = useSharedValue(0);
  const mainOpacity = useSharedValue(1);

  const leftHorizontalOffset = useSharedValue(0);
  const leftRotationOffset = useSharedValue(0);

  const rightHorizontalOffset = useSharedValue(0);
  const rightRotationOffset = useSharedValue(0);

  const extraHorizontalOffset = useSharedValue(0);
  const extraRotationOffset = useSharedValue(0);

  const mass = 0.5;
  const damping = 50;

  useEffect(() => {
    calculateDays();
  }, [activeCard, props.days]);

  const calculateDays = () => {
    let { lastIndex } = props;

    setMainDay(props.days[activeCard]);

    if (activeCard - 1 < 0) {
      setLeftDay(props.days[props.lastIndex]);
    } else {
      setLeftDay(props.days[activeCard - 1]);
    }

    if (activeCard + 1 > lastIndex) {
      setRightDay(props.days[0]);
    } else {
      setRightDay(props.days[activeCard + 1]);
    }
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);

      leftHorizontalOffset.value = withSpring(-50, {
        mass: mass,
        damping: damping,
      });
      leftRotationOffset.value = withSpring(-20, {
        mass: mass,
        damping: damping,
      });

      rightHorizontalOffset.value = withSpring(50, {
        mass: mass,
        damping: damping,
      });
      rightRotationOffset.value = withSpring(20, {
        mass: mass,
        damping: damping,
      });
    })
    .onChange((event) => {
      let direction;

      let clamp = (num, min, max) => Math.min(Math.max(num, min), max);

      if (event.velocityX > 0) {
        direction = 1;
      } else {
        direction = -1;
      }

      mainHorizontalOffset.value = event.translationX;
      mainRotationOffset.value = event.translationX / 10;

      leftHorizontalOffset.value = clamp(
        leftHorizontalOffset.value + 1 * direction,
        -50,
        0
      );
      leftRotationOffset.value = clamp(
        leftHorizontalOffset.value + 1 * direction,
        -20,
        0
      );
      rightHorizontalOffset.value = clamp(
        rightHorizontalOffset.value + 1 * direction,
        0,
        50
      );
      rightRotationOffset.value = clamp(
        rightHorizontalOffset.value + 1 * direction,
        0,
        20
      );
    })
    .onFinalize((event) => {
      if (
        event.translationX * event.translationX >
          swipeThreshold * swipeThreshold &&
        props.swipeable
      ) {
        if (event.translationX > 0) {
          // Right logic
          runOnJS(setSelectedCard)(-1);
          pressed.value = false;
          mainHorizontalOffset.value = withSpring(screenWidth);
          mainRotationOffset.value = withSpring(mainRotationOffset.value + 30);
          mainOpacity.value = withSpring(0, null, () => {
            mainHorizontalOffset.value = 0;
            mainRotationOffset.value = 0;
            mainOpacity.value = 1;
          });

          rightHorizontalOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
          rightRotationOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });

          leftHorizontalOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
          leftRotationOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
        } else {
          // Left logic
          runOnJS(setSelectedCard)(1);
          pressed.value = false;
          mainHorizontalOffset.value = withSpring(-screenWidth);
          mainRotationOffset.value = withSpring(mainRotationOffset.value - 30);
          mainOpacity.value = withSpring(0, null, () => {
            mainHorizontalOffset.value = 0;
            mainRotationOffset.value = 0;
            mainOpacity.value = 1;
          });

          rightHorizontalOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
          rightRotationOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });

          leftHorizontalOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
          leftRotationOffset.value = withSpring(0, {
            mass: mass,
            damping: damping,
          });
        }
      } else {
        // Bring back to middle
        mainHorizontalOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });
        mainRotationOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });

        rightHorizontalOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });
        rightRotationOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });

        leftHorizontalOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });
        leftRotationOffset.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });

        pressed.value = false;
      }
    });

  const mainCard = useAnimatedStyle(() => ({
    transform: [
      { translateX: mainHorizontalOffset.value },
      { scale: withTiming(pressed.value ? 1 : 0.9) },
      { rotate: String(mainRotationOffset.value) + "deg" },
    ],
    opacity: mainOpacity.value,
    backgroundColor: theme.colors.primary,
  }));
  const leftCard = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftHorizontalOffset.value },
      { scale: 0.9 },
      { rotate: String(leftRotationOffset.value) + "deg" },
    ],
    backgroundColor: theme.colors.secondary,
  }));
  const rightCard = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightHorizontalOffset.value },
      { scale: 0.9 },
      { rotate: String(rightRotationOffset.value) + "deg" },
    ],
    backgroundColor: theme.colors.tertiary,
  }));
  const extraCard = useAnimatedStyle(() => ({
    transform: [
      { translateX: extraHorizontalOffset.value },
      { scale: 0.9 },
      { rotate: String(extraRotationOffset.value) + "deg" },
    ],
  }));

  function setSelectedCard(direction) {
    let { lastIndex } = props;

    if (activeCard + direction < 0) {
      runOnJS(setActiveCard)(lastIndex);
    } else if (activeCard + direction > lastIndex) {
      runOnJS(setActiveCard)(0);
    } else {
      runOnJS(setActiveCard)(activeCard + direction);
    }
  }

  RenderCards = () => {
    if (props.swipeable == false) {
      return (
        <Card
          widgets
          style={mainCard}
          day={mainDay}
          textColor={theme.colors.onPrimary}
        />
      );
    }
    return (
      <>
        <Card
          style={leftCard}
          day={leftDay}
          textColor={theme.colors.onSecondary}
        />
        <Card
          style={rightCard}
          day={rightDay}
          textColor={theme.colors.onTertiary}
        />
        <Card
          widgets
          style={mainCard}
          day={mainDay}
          textColor={theme.colors.onPrimary}
        />
      </>
    );
  };

  if (props.lastIndex == -1) {
    // No items in the database
    return (
      <Text style={[styles.noDaysText, { color: theme.colors.onBackground }]}>
        There are currently no days, please click the plus button to add one
      </Text>
    );
  }

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <RenderCards />
        <DayPageButtons navigation={props.navigation} day={mainDay} />
      </View>
    </GestureDetector>
  );
}

export default SwipeableCards;

const styles = StyleSheet.create({
  container: {
    width: 310,
    height: 480,
    alignItems: "center",
  },
  noDaysText: {
    padding: 50,
    alignSelf: "center",
    textAlign: "center",
  },
});
