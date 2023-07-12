import { View, Text, Button, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

function SettingsPage(props) {
  const db = SQLite.openDatabase("fitone.db");
  const Deletedata = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "", // Drop entire database
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
