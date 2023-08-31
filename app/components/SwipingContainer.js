import { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SwipeableCards from "./SwipeableCards.js";

function SwipingContainer(props) {
  const deviceHeight = Dimensions.get("window").height;
  const [scale, setScale] = useState(1);
  const [swipeable, setSwipeable] = useState(true);

  useEffect(() => {
    calculateScale();
    determineSwipeable();
  }, [props.days]);

  const calculateScale = () => {
    if (deviceHeight > 700) {
      if (deviceHeight > 900) {
        setScale(1.2);
      } else {
        setScale(1.1);
      }
    }
  };

  const determineSwipeable = () => {
    if (props.daysLength < 2) {
      setSwipeable(false);
    } else {
      setSwipeable(true);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { transform: [{ scale: scale }] }]}
    >
      <SwipeableCards
        lastIndex={props.daysLength - 1}
        days={props.days}
        swipeable={swipeable}
        navigation={props.navigation}
      />
    </GestureHandlerRootView>
  );
}

export default SwipingContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
  },
});
