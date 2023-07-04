import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function SwipingCards(props) {
  const [cards] = useState([
    "Leg day",
    "Chest day",
    "Cardio day",
    "Back day",
    "Arm day",
  ]);
  const [selectedCard, setSelectedCard] = useState(2);

  function Card(props) {
    return (
      <View style={props.style}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            fontWeight: 900,
          }}
        >
          {props.text}
        </Text>
      </View>
    );
  }

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
        style={{ backgroundColor: "red", height: 50 }}
        onPress={() => {
          PressButton(1);
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 50 }}>Right</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red", height: 50 }}
        onPress={() => {
          PressButton(-1);
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 50 }}>Left</Text>
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
    top: 100,
    backgroundColor: "#93c244",
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    zIndex: 1,
  },
  leftCard: {
    position: "absolute",
    top: 100,
    backgroundColor: "#7da739",
    margin: 10,
    padding: 20,
    height: 450,
    width: 280,
    borderRadius: 10,
    transform: [{ translateX: -70 }, { rotate: "-15deg" }, { scale: 0.8 }],
  },
  rightCard: {
    position: "absolute",
    top: 100,
    backgroundColor: "#7da739",
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
