// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import SwipeableCard from "./SwipeableCard.js";

function SwipingContainer(props) {
  const deviceHeight = Dimensions.get("window").height;
  const cards = props.days;
  const [selectedCard, setSelectedCard] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    calculateScale();
  }, []);

  const calculateScale = () => {
    if (deviceHeight > 700) {
      if (deviceHeight > 900) {
        setScale(1.2);
      } else {
        setScale(1.1);
      }
    }
  };

  const DisplayCards = () => {
    let currentDay = cards[selectedCard];
    let canSwipe = true;
    let left;
    let right;

    if (cards.length == 1) {
      left = null;
      right = null;
      canSwipe = false;
    } else {
      if (cards[selectedCard - 1]) {
        left = cards[selectedCard - 1];
      } else {
        left = cards[cards.length - 1];
      }

      if (cards[selectedCard + 1]) {
        right = cards[selectedCard + 1];
      } else {
        right = cards[0];
      }
    }

    const updateIndex = (multiplier) => {
      newIndex = selectedCard + multiplier;
      if (cards[newIndex]) {
        setSelectedCard(newIndex);
      } else {
        if (multiplier == -1) setSelectedCard(cards.length - 1);
        if (multiplier == 1) setSelectedCard(0);
      }
    };

    return (
      <SwipeableCard
        currentDay={currentDay}
        left={left}
        right={right}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
        updateIndex={updateIndex}
        canSwipe={canSwipe}
        navigation={props.navigation}
      />
    );
  };

  return (
    <View style={[styles.container, { transform: [{ scale: scale }] }]}>
      <DisplayCards />
    </View>
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
