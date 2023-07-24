// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import SwipeableCard from "./SwipeableCard.js";

function SwipingContainer(props) {
  const cards = props.days;
  const [selectedCard, setSelectedCard] = useState(0);

  function DisplayCards() {
    let currentDay = cards[selectedCard];
    let left = null;
    let right = null;

    if (cards.length == 1) {
      left = null;
      right = null;
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
      />
    );
  }

  return (
    <View style={styles.container}>
      <DisplayCards />
    </View>
  );
}

export default SwipingContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    transform: [{ scale: 1.1 }],
  },
});
