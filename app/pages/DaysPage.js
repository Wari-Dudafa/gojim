import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

import SwipingCards from "../../SwipingCards";

function DaysPage({ navigation, props }) {
  const db = SQLite.openDatabase("fitone.db");
  const [name, setName] = useState("");
  const [results, setCurrentName] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user",
        null,
        (txObj, resultSet) => setCurrentName(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }, []);

  const AddName = (name) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (name) values (?)",
        [name],
        null,
        (txObj, error) => console.log(error)
      );
      Alert.alert("Name saved");
      setName("");
    });
    console.log(name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <SwipingCards />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <Button
        title="submit name"
        onPress={() => {
          AddName(name);
        }}
      />
      <Button
        title="Add new day"
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
      ></Button>
    </View>
  );
}

export default DaysPage;
