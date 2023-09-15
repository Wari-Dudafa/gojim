import { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SwipeableCards from "./SwipeableCards.js";

function SwipingContainer(props) {
  const deviceHeight = Dimensions.get("window").height;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    calculateScale();
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

  return (
    <GestureHandlerRootView
      style={[styles.container, { transform: [{ scale: scale }] }]}
    >
      <SwipeableCards
        lastIndex={props.days.length - 1}
        days={props.days}
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
