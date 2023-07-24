import { View, Text, Button, Alert, StyleSheet } from "react-native";

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

  return (
    <View style={styles.container}>
      <Text></Text>
      <Button title="Delete data" onPress={Deletedata} />
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});
