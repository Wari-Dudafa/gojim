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
  const [swipeable, setSwipeable] = useState(true);

  const [mainDay, setMainDay] = useState(props.days[activeCard]);
  const [leftDay, setLeftDay] = useState(props.days[activeCard]);
  const [rightDay, setRightDay] = useState(props.days[activeCard]);
  const [otherDay, setOtherDay] = useState(props.days[activeCard]);

  const swipeThreshold = screenWidth * 0.35;

  const xPosition = useSharedValue(0);
  const direction = useSharedValue(-1);

  const primaryHorizontalOffset = useSharedValue(0);
  const primaryRotationOffset = useSharedValue(0);
  const primaryOpacity = useSharedValue(1);

  const secondaryHorizontalOffset = useSharedValue(0);
  const secondaryRotationOffset = useSharedValue(0);
  const secondaryScale = useSharedValue(0.9);

  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  useEffect(() => {
    calculateDays();
    determineSwipeable();
  }, [activeCard, props.days]);

  const determineSwipeable = () => {
    if (props.days.length == 1) {
      setSwipeable(false);
    } else {
      setSwipeable(true);
    }
  };

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

      secondaryHorizontalOffset.value = withSpring(50, springConfig);
      secondaryRotationOffset.value = withSpring(20, springConfig);
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
      primaryHorizontalOffset.value = event.translationX;
      primaryRotationOffset.value = event.translationX / 10;
      runOnJS(determineOtherCard)();
    })
    .onFinalize((event) => {
      const reachedSwipeThreshold = (direction) => {
        runOnJS(setSelectedCard)(-direction);
        pressed.value = false;
        primaryHorizontalOffset.value = withTiming(
          screenWidth * direction * 1.5
        );
        primaryRotationOffset.value = withTiming(
          primaryRotationOffset.value + 30 * direction
        );
        primaryOpacity.value = withTiming(0, null, () => {
          primaryHorizontalOffset.value = 0;
          primaryRotationOffset.value = 0;
          primaryOpacity.value = 1;
          xPosition.value = withSpring(0, springConfig);
        });
        secondaryScale.value = withSpring(0.8, springConfig);
      };

      if (
        (event.translationX > swipeThreshold ||
          event.translationX < -swipeThreshold) &&
        swipeable
      ) {
        if (event.translationX > 0) {
          // Right logic
          reachedSwipeThreshold(1);
        } else {
          // Left logic
          reachedSwipeThreshold(-1);
        }
      } else {
        // Bring back to middle
        xPosition.value = withSpring(0, springConfig);

        primaryHorizontalOffset.value = withSpring(0, springConfig);
        primaryRotationOffset.value = withSpring(0, springConfig);

        secondaryHorizontalOffset.value = withSpring(0, springConfig);
        secondaryRotationOffset.value = withSpring(0, springConfig);

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
        { translateX: primaryHorizontalOffset.value },
        { scale: withTiming(pressed.value ? 1 - s : 0.9) },
        { rotate: String(primaryRotationOffset.value) + "deg" },
      ],
      backgroundColor: theme.colors.primary,
      opacity: primaryOpacity.value,
    };
  });

  const leftCard = useAnimatedStyle(() => {
    let x = interpolate(xPosition.value, [0, swipeThreshold], [0, 50], "clamp");
    let r = interpolate(xPosition.value, [0, swipeThreshold], [0, 20], "clamp");
    let s = interpolate(
      xPosition.value,
      [0, swipeThreshold],
      [0, 0.1],
      "clamp"
    );
    let o = interpolate(
      xPosition.value,
      [-swipeThreshold / 2, 0],
      [0, 1],
      "clamp"
    );

    return {
      transform: [
        { translateX: -secondaryHorizontalOffset.value + x },
        { scale: secondaryScale.value + s },
        { rotate: String(-secondaryRotationOffset.value + r) + "deg" },
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
    let z;
    let x = interpolate(
      xPosition.value,
      [-swipeThreshold, 0],
      [50, 0],
      "clamp"
    );
    let r = interpolate(
      xPosition.value,
      [-swipeThreshold, 0],
      [20, 0],
      "clamp"
    );
    let s = interpolate(
      xPosition.value,
      [-swipeThreshold, 0],
      [0.1, 0],
      "clamp"
    );
    let o = interpolate(
      xPosition.value,
      [0, swipeThreshold / 2],
      [1, 0],
      "clamp"
    );

    if (direction.value > 0) {
      z = 0;
    } else {
      z = -1;
    }

    return {
      transform: [
        { translateX: secondaryHorizontalOffset.value - x },
        { scale: secondaryScale.value + s },
        { rotate: String(secondaryRotationOffset.value - r) + "deg" },
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

  const otherCard = useAnimatedStyle(() => {
    let o = 0;
    let s1 = interpolate(
      xPosition.value,
      [-swipeThreshold, 0],
      [0.1, 0],
      "clamp"
    );
    let s2 = interpolate(
      xPosition.value,
      [0, swipeThreshold],
      [0, 0.1],
      "clamp"
    );

    if (
      xPosition.value >= swipeThreshold ||
      xPosition.value <= -swipeThreshold
    ) {
      o = 1;
    } else {
      o = 0;
    }

    return {
      opacity: o,
      backgroundColor: theme.colors.primary,
      transform: [{ scale: secondaryScale.value + s1 + s2 }],
    };
  });

  const rightCardText = useAnimatedStyle(() => {
    let c = interpolateColor(
      xPosition.value,
      [-swipeThreshold, 0],
      [theme.colors.onPrimary, theme.colors.onTertiary]
    );

    return {
      color: c,
    };
  });

  const leftCardText = useAnimatedStyle(() => {
    let c = interpolateColor(
      xPosition.value,
      [0, swipeThreshold],
      [theme.colors.onSecondary, theme.colors.onPrimary]
    );

    return {
      color: c,
    };
  });

  function setSelectedCard(direction) {
    if (activeCard + direction < 0) {
      setActiveCard(props.lastIndex);
    } else if (activeCard + direction > props.lastIndex) {
      setActiveCard(0);
    } else {
      setActiveCard(activeCard + direction);
    }
  }

  function determineOtherCard() {
    let halfSwipeThreshold = swipeThreshold * 0.5;

    if (pressed.value) {
      if (
        xPosition.value >= halfSwipeThreshold ||
        xPosition.value <= -halfSwipeThreshold
      ) {
        if (direction.value > 0 && xPosition.value >= halfSwipeThreshold) {
          // Left card
          if (otherDay === leftDay) {
            // Do nothing
          } else {
            setOtherDay(leftDay);
          }
        } else if (
          direction.value < 0 &&
          xPosition.value <= -halfSwipeThreshold
        ) {
          // Right card
          if (otherDay === rightDay) {
            // Do nothing
          } else {
            setOtherDay(rightDay);
          }
        }
      }
    }
  }

  RenderCards = () => {
    if (swipeable) {
      return (
        <>
          <Card style={leftCard} day={leftDay} textColor={leftCardText} />
          <Card style={rightCard} day={rightDay} textColor={rightCardText} />
          <Card style={otherCard} day={otherDay} />
          <Card widgets style={mainCard} day={mainDay} />
        </>
      );
    } else {
      return <Card widgets style={mainCard} day={mainDay} />;
    }
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
        <DayPageButtons
          navigation={props.navigation}
          day={mainDay}
          onPress={() => {
            if (activeCard == props.lastIndex) {
              setSelectedCard(1);
            }
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.outline,
            transform: [{ translateY: 10 }],
          }}
        >
          {activeCard + 1}/{props.lastIndex + 1}
        </Text>
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
    justifyContent: "flex-end",
  },
  noDaysText: {
    padding: 50,
    alignSelf: "center",
    textAlign: "center",
  },
});
