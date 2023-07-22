import { View, Text, Button, Alert } from "react-native";

import Database from "../classes/DatabaseClass";

function SettingsPage(props) {
  const db = new Database();

  const Deletedata = () => {
    db.wipeDatabase((error) => {
      Alert.alert("An error occured, please try again later");
      console.log(error);
    });
    Alert.alert("Data Deleted");
  };

  const InitTables = () => {
    db.init((error) => {
      Alert.alert("An error occured, please try again later");
      console.log(error);
    });
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
