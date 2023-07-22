// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import React, { useState } from "react";
import { Animated, PanResponder, Dimensions, StyleSheet } from "react-native";
import Card from "./Card.js";

const SwipeableCard = ({ currentDay, right, left, updateIndex }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let cardOpacity = new Animated.Value(1);

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        // console.log("right");
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        // console.log("left");
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 180 &&
        gestureState.dx > -SCREEN_WIDTH + 180
      ) {
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 15,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 180) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // Right
          updateIndex(-1);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 180) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // Left
          updateIndex(1);
        });
      }
    },
  });

  let currentAnimation = {
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

  let rightAnimations = {
    // Right
    cardOpacity: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 0.5, 0],
    }),
    cardRotation: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["0deg", "15deg", "20deg"],
    }),
    cardX: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 150, 250],
    }),
    cardY: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [20, 45, 150],
    }),
    cardScale: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.9, 0.8, 0.3],
    }),
  };

  let leftAnimations = {
    // Left
    cardOpacity: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 0.5, 0],
    }),
    cardRotation: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-20deg", "-15deg", "0deg"],
    }),
    cardX: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [-250, -150, 0],
    }),
    cardY: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [150, 45, 20],
    }),
    cardScale: xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.3, 0.8, 0.9],
    }),
  };

  return (
    <>
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
        <Card name={left.name} />
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
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: "black",
            width: 280,
            height: 450,
            borderRadius: 10,
            top: 70,
            zIndex: 2,
            opacity: rightAnimations.cardOpacity,
          }}
        />
        <Card name={right.name} />
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
            width: 280,
            height: 450,
            borderRadius: 10,
            top: 70,
            zIndex: 2,
            opacity: currentAnimation.cardOpacity,
          }}
        />
        <Card name={currentDay.name} />
      </Animated.View>
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
});