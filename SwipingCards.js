import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Card from "./app/components/Card.js";

function SwipingCards(props) {
  let defaultCardIndex = 2;

  const [cards] = useState([
    "Leg day",
    "Chest day",
    "Cardio day",
    "Back day",
    "Arm day",
  ]);
  const [selectedCard, setSelectedCard] = useState(defaultCardIndex);

  function DisplayCards(props) {
    return (
      <View style={styles.cardContainer}>
        {cards.map((item, index) => {
          if (index === selectedCard) {
            return <Card key={index} style={styles.mainCard} text={item} />;
          } else if (index === selectedCard - 1) {
            return <Card key={index} style={styles.leftCard} text={item} />;
          } else if (index === selectedCard + 1) {
            return <Card key={index} style={styles.rightCard} text={item} />;
          } else {
            return <Card key={index} style={styles.hiddenCard} text={item} />;
          }
        })}
      </View>
    );
  }

  const PressButton = (direction) => {
    let temp = selectedCard + 1 * direction;
    if (temp >= cards.length) {
      temp = 0;
    }
    if (temp < 0) {
      temp = cards.length - 1;
    }
    setSelectedCard(temp);
  };

  return (
    <View>
      <DisplayCards />

      <TouchableOpacity
        style={{
          backgroundColor: "#2e476b",
          height: 60,
          width: 60,
          position: "absolute",
          borderRadius: 100,
          right: "15%",
          top: 600,
        }}
        onPress={() => {
          PressButton(1);
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 50 }}> </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#2e476b",
          height: 60,
          width: 60,
          position: "absolute",
          borderRadius: 100,
          left: "15%",
          top: 600,
        }}
        onPress={() => {
          PressButton(-1);
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 50 }}> </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SwipingCards;

const styles = StyleSheet.create({
  hiddenCard: {
    position: "absolute",
    top: 100,
    backgroundColor: "#93c244",
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    opacity: 0,
  },
  mainCard: {
    position: "absolute",
    top: 70,
    backgroundColor: "#93c244",
    borderColor: "#2e476b",
    borderWidth: 2,
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    zIndex: 1,
  },
  leftCard: {
    position: "absolute",
    opacity: 0.6,
    top: 120,
    backgroundColor: "#93c244",
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    transform: [{ translateX: -70 }, { rotate: "-15deg" }, { scale: 0.8 }],
  },
  rightCard: {
    position: "absolute",
    opacity: 0.6,
    top: 120,
    backgroundColor: "#93c244",
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    transform: [{ translateX: 70 }, { rotate: "15deg" }, { scale: 0.8 }],
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
