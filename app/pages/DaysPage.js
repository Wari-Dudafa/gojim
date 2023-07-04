import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

function DaysPage(props) {
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
    console.log("query results: ", results);
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
    <View>
      <Text>Days page</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <Button
        title="submit name"
        onPress={() => {
          AddName(name);
        }}
      />
    </View>
  );
}

export default DaysPage;
