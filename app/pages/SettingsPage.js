import { View, Text, Button, Alert } from "react-native";

import Database from "../classes/DatabaseClass";

function SettingsPage(props) {
  const db = new Database();

  const Deletedata = () => {
    db.wipeDatabase();
    Alert.alert("Data Deleted");
  };

  const InitTables = () => {
    db.init();
    Alert.alert("New Tables Made");
  };

  return (
    <View>
      <Text>Settings page</Text>
      <Button title="Delete data" onPress={Deletedata} />
      <Button title="Make new tables" onPress={InitTables} />
    </View>
  );
}

export default SettingsPage;
