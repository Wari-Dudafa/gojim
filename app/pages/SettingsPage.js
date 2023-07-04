import React from "react";
import { View, Text, Button } from "react-native";

function SettingsPage(props) {
  const Deletedata = () => {
    console.log("Data Deleted!");
    // Add functionality later
  };

  return (
    <View>
      <Text>Settings page</Text>
      <Button title="Delete data" onPress={Deletedata} />
    </View>
  );
}

export default SettingsPage;
