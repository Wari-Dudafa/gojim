import { View, Text, Button, Alert, StyleSheet } from "react-native";

import Database from "../classes/DatabaseClass";

function SettingsPage(props) {
  const db = new Database();

  const Deletedata = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete all your data?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            db.wipeDatabase((error) => {
              Alert.alert("An error occured, please try again later");
              console.log(error);
            });
            Alert.alert("Data Deleted");
          },
        },
      ],
      { cancelable: false }
    );
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
