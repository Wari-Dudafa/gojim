// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import { useState } from "react";
import {
  Text,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { useTheme } from "react-native-paper";

import Card from "./Card.js";
import Button from "./Button.js";

function SwipeableCard(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [hapticSetting, setHapticSetting] = useState(true);
  const [sideCardsAnimatedValue, setSideCardsAnimatedValue] = useState(
    new Animated.Value(0)
  );
  const cardOpacity = new Animated.Value(1);
  const swipeThreshold = 250;
  const speed = 100;
  const bounciness = 1;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      sideCardsAnimatedValue.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < screenWidth - swipeThreshold &&
        gestureState.dx > -screenWidth + swipeThreshold
      ) {
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
        Animated.spring(sideCardsAnimatedValue, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
      } else if (gestureState.dx > screenWidth - swipeThreshold) {
        if (props.canSwipe) {
          if (hapticSetting) {
            impactAsync(ImpactFeedbackStyle.Medium);
          }
          Animated.parallel([
            Animated.spring(xPosition, {
              toValue: screenWidth,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
            Animated.spring(cardOpacity, {
              toValue: 0,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
            Animated.spring(sideCardsAnimatedValue, {
              toValue: 200,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Right
            props.updateIndex(-1);
          });
        } else {
          Animated.spring(xPosition, {
            toValue: 0,
            speed: 5,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        }
      } else if (gestureState.dx < -screenWidth + swipeThreshold) {
        if (props.canSwipe) {
          if (hapticSetting) {
            impactAsync(ImpactFeedbackStyle.Medium);
          }
          Animated.parallel([
            Animated.spring(xPosition, {
              toValue: -screenWidth,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
            Animated.spring(cardOpacity, {
              toValue: 0,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
            Animated.spring(sideCardsAnimatedValue, {
              toValue: -200,
              speed: speed,
              bounciness: bounciness,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Left
            props.updateIndex(1);
          });
        } else {
          Animated.spring(xPosition, {
            toValue: 0,
            speed: 5,
            bounciness: 15,
            useNativeDriver: true,
          }).start();
        }
      }
    },
  });

  const currentAnimation = {
    cardOpacity: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.2, 0, 0.2],
    }),
    rotateCard: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-20deg", "0deg", "20deg"],
    }),
    cardScale: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.8, 1, 0.8],
    }),
    cardY: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [100, 0, 100],
    }),
  };

  const rightAnimations = {
    // Right
    cardOpacity: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 0.5, 0],
    }),
    cardRotation: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["0deg", "15deg", "10deg"],
    }),
    cardX: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 150, 0],
    }),
    cardY: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 45, 350],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 150, 200],
      outputRange: [1, 0.8, 0, 0],
    }),
  };

  const leftAnimations = {
    // Left
    cardOpacity: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 0.5, 0],
    }),
    cardRotation: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-10deg", "-15deg", "0deg"],
    }),
    cardX: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, -150, 0],
    }),
    cardY: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [350, 45, 0],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, -150, 0, 200],
      outputRange: [0, 0, 0.8, 1],
    }),
  };

  const behindCardAnimations = {
    // Behind card
    cardOpacity: sideCardsAnimatedValue.interpolate({
      inputRange: [-400, -200, 0, 200, 400],
      outputRange: [0.5, 0.5, 0.9, 0.5, 0.5],
    }),
    cardRotation: sideCardsAnimatedValue.interpolate({
      inputRange: [-400, -200, 0, 200, 400],
      outputRange: ["15deg", "15deg", "0deg", "-15deg", "-15deg"],
    }),
    cardX: sideCardsAnimatedValue.interpolate({
      inputRange: [-400, -200, 0, 200, 400],
      outputRange: [150, 150, 0, -150, -150],
    }),
    cardY: sideCardsAnimatedValue.interpolate({
      inputRange: [-400, -200, 0, 200, 400],
      outputRange: [45, 45, 150, 45, 45],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-400, -200, 0, 200, 400],
      outputRange: [0.8, 0.8, 0.3, 0.8, 0.8],
    }),
  };

  let { currentDay, right, left } = props;
  if (!currentDay) currentDay = false;
  if (!right) right = false;
  if (!left) left = false;

  return (
    <>
      {currentDay ? (
        <>
          <View style={styles.buttonContainer}>
            <Button
              style={[
                styles.bottomButtons,
                {
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                  backgroundColor: theme.colors.secondary,
                },
              ]}
              onPress={() => {
                props.navigation.navigate("ExerciseGraphPage", {
                  day: currentDay,
                });
              }}
              setHapticSetting={setHapticSetting}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={40}
                color={theme.colors.onSecondary}
              />
            </Button>

            <Button
              style={[
                styles.bottomButtons,
                { backgroundColor: theme.colors.secondary },
              ]}
              onPress={() => {
                Alert.alert(
                  "Confirmation",
                  "Are you ready to start your session?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        props.navigation.navigate("StartDayPage", {
                          day: currentDay,
                        });
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <MaterialCommunityIcons
                name="play"
                size={40}
                color={theme.colors.onSecondary}
              />
            </Button>

            <Button
              style={[
                styles.bottomButtons,
                {
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  backgroundColor: theme.colors.secondary,
                },
              ]}
              onPress={() => {
                props.navigation.navigate("EditDayPage", { day: currentDay });
              }}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={40}
                color={theme.colors.onSecondary}
              />
            </Button>
          </View>

          <Animated.View
            shouldRasterizeIOS
            {...panResponder.panHandlers}
            style={[
              styles.cardStyle,
              {
                transform: [
                  { translateX: behindCardAnimations.cardX },
                  { rotate: behindCardAnimations.cardRotation },
                  { translateY: behindCardAnimations.cardY },
                  { scale: behindCardAnimations.cardScale },
                ],
              },
            ]}
          >
            {left ? (
              <>
                <Card dayName=" " fade={false} />
                <Animated.View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    borderRadius: 10,
                    width: 280,
                    height: 450,
                    top: 70,
                    zIndex: 2,
                    opacity: behindCardAnimations.cardOpacity,
                  }}
                />
              </>
            ) : null}
          </Animated.View>

          <Animated.View
            shouldRasterizeIOS
            {...panResponder.panHandlers}
            style={[
              styles.cardStyle,
              {
                transform: [
                  { translateX: leftAnimations.cardX },
                  { rotate: leftAnimations.cardRotation },
                  { translateY: leftAnimations.cardY },
                  { scale: leftAnimations.cardScale },
                ],
              },
            ]}
          >
            {left ? (
              <>
                <Card dayName={left.name} fade />
                <Animated.View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    borderRadius: 10,
                    width: 280,
                    height: 450,
                    top: 70,
                    zIndex: 2,
                    opacity: leftAnimations.cardOpacity,
                  }}
                />
              </>
            ) : null}
          </Animated.View>

          <Animated.View
            shouldRasterizeIOS
            {...panResponder.panHandlers}
            style={[
              styles.cardStyle,
              {
                transform: [
                  { translateX: rightAnimations.cardX },
                  { rotate: rightAnimations.cardRotation },
                  { translateY: rightAnimations.cardY },
                  { scale: rightAnimations.cardScale },
                ],
              },
            ]}
          >
            {right ? (
              <>
                <Card dayName={right.name} fade />
                <Animated.View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    borderRadius: 10,
                    width: 280,
                    height: 450,
                    top: 70,
                    zIndex: 2,
                    opacity: rightAnimations.cardOpacity,
                  }}
                />
              </>
            ) : null}
          </Animated.View>

          <Animated.View
            shouldRasterizeIOS
            {...panResponder.panHandlers}
            style={[
              styles.cardStyle,
              {
                opacity: cardOpacity,
                transform: [
                  { translateX: xPosition },
                  { rotate: currentAnimation.rotateCard },
                  { scale: currentAnimation.cardScale },
                  { translateY: currentAnimation.cardY },
                ],
              },
            ]}
          >
            <Animated.View
              style={{
                position: "absolute",
                backgroundColor: "black",
                borderRadius: 10,
                width: 280,
                height: 450,
                top: 70,
                zIndex: 2,
                opacity: currentAnimation.cardOpacity,
              }}
            />
            <Card
              dayId={currentDay.id}
              dayName={currentDay.name}
              fade={false}
              widgets
            />
          </Animated.View>
        </>
      ) : (
        <Text style={[styles.noDaysText, { color: theme.colors.onBackground }]}>
          There are currently no days, please click the plus button to add one
        </Text>
      )}
    </>
  );
}

export default SwipeableCard;

const styles = StyleSheet.create({
  cardStyle: {
    alignItems: "center",
    position: "absolute",
  },
  bottomButtons: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 5,
    position: "absolute",
    top: 440,
  },
  noDaysText: {
    padding: 50,
    alignSelf: "center",
    textAlign: "center",
  },
});
