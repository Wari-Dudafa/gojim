// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import { useState } from "react";
import {
  Text,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Card from "./Card.js";

const SwipeableCard = ({
  currentDay,
  right,
  left,
  updateIndex,
  canSwipe,
  navigation,
}) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [sideCardsAnimatedValue, setSideCardsAnimatedValue] = useState(
    new Animated.Value(0)
  );
  const cardOpacity = new Animated.Value(1);
  const swipeThreshold = 250;
  const speed = 100;
  const bounciness = 1;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      sideCardsAnimatedValue.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - swipeThreshold &&
        gestureState.dx > -SCREEN_WIDTH + swipeThreshold
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
      } else if (gestureState.dx > SCREEN_WIDTH - swipeThreshold) {
        if (canSwipe) {
          Animated.parallel([
            Animated.spring(xPosition, {
              toValue: SCREEN_WIDTH,
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
            updateIndex(-1);
          });
        } else {
          Animated.spring(xPosition, {
            toValue: 0,
            speed: 5,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        }
      } else if (gestureState.dx < -SCREEN_WIDTH + swipeThreshold) {
        if (canSwipe) {
          Animated.parallel([
            Animated.spring(xPosition, {
              toValue: -SCREEN_WIDTH,
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
            updateIndex(1);
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
      outputRange: [0, 45, 600],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 60, 200],
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
      outputRange: [600, 45, 0],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, -60, 0, 200],
      outputRange: [0, 0, 0.8, 1],
    }),
  };

  const behindCardAnimations = {
    // Behind card
    cardOpacity: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200, 400],
      outputRange: [0.9, 0.9, 0.5, 0.5],
    }),
    cardRotation: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200, 400],
      outputRange: ["0deg", "0deg", "-15deg", "-15deg"],
    }),
    cardX: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200, 400],
      outputRange: [-100, -100, -150, -150],
    }),
    cardY: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200, 400],
      outputRange: [150, 150, 45, 45],
    }),
    cardScale: sideCardsAnimatedValue.interpolate({
      inputRange: [-200, 0, 200, 400],
      outputRange: [0, 0.3, 0.8, 0.8],
    }),
  };

  if (!currentDay) currentDay = false;
  if (!right) right = false;
  if (!left) left = false;

  return (
    <>
      {currentDay ? (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bottomButtons}>
              <Feather name="activity" size={40} color="#e6e6e6" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomButtons}
              onPress={() => {
                navigation.navigate("EditDayPage", { day: currentDay });
              }}
            >
              <Feather name="edit-2" size={40} color="#e6e6e6" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomButtons}
              onPress={() => {
                navigation.navigate("StartWorkoutPage");
              }}
            >
              <Feather name="play" size={40} color="#e6e6e6" />
            </TouchableOpacity>
          </View>

          <Animated.View
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
                <Card name=" " fade={false} />
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
            ) : (
              <></>
            )}
          </Animated.View>

          <Animated.View
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
                <Card name={left.name} fade={true} />
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
            ) : (
              <></>
            )}
          </Animated.View>

          <Animated.View
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
                <Card name={right.name} fade={true} />
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
            ) : (
              <></>
            )}
          </Animated.View>

          <Animated.View
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
            <Card name={currentDay.name} fade={false} />
          </Animated.View>
        </>
      ) : (
        <>
          <Text
            style={{
              padding: 50,
              color: "#e6e6e6",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            There are currently no days, please click the plus button to add one
          </Text>
        </>
      )}
    </>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  cardStyle: {
    alignItems: "center",
    position: "absolute",
  },
  swipeText: {
    fontSize: 20,
    textAlign: "center",
    color: "#e6e6e6",
  },
  bottomButtons: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4490c2",
    marginHorizontal: 10,
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
});
