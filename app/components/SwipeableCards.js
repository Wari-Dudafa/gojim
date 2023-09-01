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
  interpolate,
  interpolateColor,
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

  const xPosition = useSharedValue(0);
  const direction = useSharedValue(-1);

  const mainHorizontalOffset = useSharedValue(0);
  const mainRotationOffset = useSharedValue(0);
  const mainOpacity = useSharedValue(1);

  const leftHorizontalOffset = useSharedValue(0);
  const leftRotationOffset = useSharedValue(0);
  const leftScale = useSharedValue(0.9);

  const rightHorizontalOffset = useSharedValue(0);
  const rightRotationOffset = useSharedValue(0);
  const rightScale = useSharedValue(0.9);

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
      let velo;

      if (event.velocityX > 0) {
        velo = 1;
      } else {
        velo = -1;
      }
      direction.value = velo;
      xPosition.value = event.translationX;
      mainHorizontalOffset.value = event.translationX;
      mainRotationOffset.value = event.translationX / 10;
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
          mainHorizontalOffset.value = withTiming(screenWidth * 1.5);
          mainRotationOffset.value = withTiming(mainRotationOffset.value + 30);
          mainOpacity.value = withTiming(0, null, () => {
            mainHorizontalOffset.value = 0;
            mainRotationOffset.value = 0;
            mainOpacity.value = 1;
            xPosition.value = withSpring(0, {
              mass: mass,
              damping: damping,
            });
          });

          leftScale.value = withSpring(0.8, {
            mass: mass,
            damping: damping,
          });
          rightScale.value = withSpring(0.8, {
            mass: mass,
            damping: damping,
          });
        } else {
          // Left logic
          runOnJS(setSelectedCard)(1);
          pressed.value = false;
          mainHorizontalOffset.value = withSpring(-screenWidth);
          mainRotationOffset.value = withSpring(mainRotationOffset.value - 30);
          mainOpacity.value = withTiming(0, null, () => {
            mainHorizontalOffset.value = 0;
            mainRotationOffset.value = 0;
            mainOpacity.value = 1;
            xPosition.value = withSpring(0, {
              mass: mass,
              damping: damping,
            });
          });

          leftScale.value = withSpring(0.8, {
            mass: mass,
            damping: damping,
          });
          rightScale.value = withSpring(0.8, {
            mass: mass,
            damping: damping,
          });
        }
      } else {
        // Bring back to middle
        xPosition.value = withSpring(0, {
          mass: mass,
          damping: damping,
        });

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

  const mainCard = useAnimatedStyle(() => {
    let localX;
    let s;

    if (pressed.value) {
      localX = xPosition.value;
    } else {
      localX = 0;
    }

    s = interpolate(
      localX,
      [-swipeThreshold, 0, swipeThreshold],
      [0.2, 0, 0.2],
      "clamp"
    );

    return {
      transform: [
        { translateX: mainHorizontalOffset.value },
        { scale: withTiming(pressed.value ? 1 - s : 0.9) },
        { rotate: String(mainRotationOffset.value) + "deg" },
      ],
      backgroundColor: theme.colors.primary,
      opacity: mainOpacity.value,
    };
  });

  const leftCard = useAnimatedStyle(() => {
    let x;
    let r;
    let s;
    let o;

    x = interpolate(xPosition.value, [0, swipeThreshold], [0, 50], "clamp");
    r = interpolate(xPosition.value, [0, swipeThreshold], [0, 20], "clamp");
    s = interpolate(xPosition.value, [0, swipeThreshold], [0, 0.1], "clamp");
    o = interpolate(xPosition.value, [-swipeThreshold / 2, 0], [0, 1], "clamp");

    return {
      transform: [
        { translateX: leftHorizontalOffset.value + x },
        { scale: leftScale.value + s },
        { rotate: String(leftRotationOffset.value + r) + "deg" },
      ],
      backgroundColor: interpolateColor(
        xPosition.value,
        [0, swipeThreshold],
        [theme.colors.secondary, theme.colors.primary]
      ),
      opacity: o,
    };
  });

  const rightCard = useAnimatedStyle(() => {
    let x;
    let r;
    let s;
    let o;
    let z;

    if (direction.value > 0) {
      z = 0;
    } else {
      z = -1;
    }

    x = interpolate(xPosition.value, [-swipeThreshold, 0], [50, 0], "clamp");
    r = interpolate(xPosition.value, [-swipeThreshold, 0], [20, 0], "clamp");
    s = interpolate(xPosition.value, [-swipeThreshold, 0], [0.1, 0], "clamp");
    o = interpolate(xPosition.value, [0, swipeThreshold / 2], [1, 0], "clamp");

    return {
      transform: [
        { translateX: rightHorizontalOffset.value - x },
        { scale: rightScale.value + s },
        { rotate: String(rightRotationOffset.value - r) + "deg" },
      ],
      backgroundColor: interpolateColor(
        xPosition.value,
        [-swipeThreshold, 0],
        [theme.colors.primary, theme.colors.tertiary]
      ),
      opacity: o,
      zIndex: z,
    };
  });

  function setSelectedCard(direction) {
    let haltDuration = 150;
    setTimeout(() => {
      let { lastIndex } = props;

      if (activeCard + direction < 0) {
        runOnJS(setActiveCard)(lastIndex);
      } else if (activeCard + direction > lastIndex) {
        runOnJS(setActiveCard)(0);
      } else {
        runOnJS(setActiveCard)(activeCard + direction);
      }
    }, haltDuration);
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
          textColor={interpolateColor(
            xPosition.value,
            [0, swipeThreshold],
            [theme.colors.onSecondary, theme.colors.onPrimary]
          )}
        />
        <Card
          style={rightCard}
          day={rightDay}
          textColor={interpolateColor(
            xPosition.value,
            [-swipeThreshold, 0],
            [theme.colors.onPrimary, theme.colors.onTertiary]
          )}
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
