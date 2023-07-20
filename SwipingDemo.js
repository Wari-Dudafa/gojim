// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import Card from "./app/components/Card.js";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SwipeableCard = ({ item, removeCard, swipedDirection }) => {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 180 &&
        gestureState.dx > -SCREEN_WIDTH + 180
      ) {
        swipedDirection("--");
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
          swipedDirection(swipeDirection);
          removeCard();
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
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <Card name={item.cardTitle} />
    </Animated.View>
  );
};

function SwipingDemo() {
  const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const removeCard = (id) => {
    sampleCardArray.splice(
      sampleCardArray.findIndex((item) => item.id == id),
      1
    );
    setSampleCardArray(sampleCardArray);
  };
  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.swipeText}>
        {swipeDirection}
      </Text>
      <View style={styles.container}>
        {sampleCardArray.map((item, index) => {
          return (
            <SwipeableCard
              key={index}
              item={item}
              removeCard={() => removeCard(item.id)}
              swipedDirection={lastSwipedDirection}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default SwipingDemo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
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

const DEMO_CONTENT = [
  {
    id: "1",
    cardTitle: "Card 1",
    backgroundColor: "#FFC107",
  },
  {
    id: "2",
    cardTitle: "Card 2",
    backgroundColor: "#ED2525",
  },
  {
    id: "3",
    cardTitle: "Card 3",
    backgroundColor: "#E7088E",
  },
  {
    id: "4",
    cardTitle: "Card 4",
    backgroundColor: "#00BCD4",
  },
  {
    id: "5",
    cardTitle: "Card 5",
    backgroundColor: "#FFFB14",
  },
].reverse();
