// Got some serious help from: https://aboutreact.com/react-native-swipeable-cardview-like-tinder/
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SwipeableCard from "./SwipeableCard.js";

function SwipingContainer() {
  const cards = [
    { dayName: "0" },
    { dayName: "1" },
    { dayName: "2" },
    { dayName: "3" },
    { dayName: "4" },
    { dayName: "5" },
    { dayName: "6" },
    { dayName: "7" },
    { dayName: "8" },
    { dayName: "9" },
    { dayName: "10" },
  ];
  const [selectedCard, setSelectedCard] = useState(5);

  function DisplayCards() {
    let currentDay = cards[selectedCard];
    let left = null;
    let right = null;

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
        offset="left"
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
    transform: [{scale: 1.1}]
  },
});
