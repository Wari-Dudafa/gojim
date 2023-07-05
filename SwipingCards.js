import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    var random = Math.random();
    var scaleX = random < 0.5 ? 1 : -1;
    random = Math.random();
    var scaleY = random < 0.5 ? 1 : -1;
    return (
      <View style={props.style}>
        <Image
          style={{
            position: "absolute",
            width: 280,
            height: 450,
            resizeMode: "stretch",
            opacity: 0.05,
            transform: [{ scaleX: scaleX }, { scaleY: scaleY }],
            zIndex: -1,
          }}
          source={require("./assets/shading.png")}
        />
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            borderColor: "#e6e6e6",
            borderWidth: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: 900,
              color: "#e6e6e6",
            }}
          >
            {props.text}
          </Text>
        </View>
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
    top: 100,
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
    opacity: 0.8,
    top: 100,
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
    opacity: 0.8,
    top: 100,
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
