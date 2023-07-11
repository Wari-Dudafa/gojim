import React from "react";
import { View, Text, Button, Alert } from "react-native";

function SettingsPage(props) {
  const Deletedata = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "", // Delete all the tables in the database
        null,
        null,
        (txObj, error) => console.log(error)
      );
    });

    Alert.alert("Data Deleted");
  };

  return (
    <View>
      <Text>Settings page</Text>
      <Button title="Delete data" onPress={Deletedata} />
    </View>
  );
}

export default SettingsPage;
