import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Alert, StyleSheet, Switch } from "react-native";

import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function SettingsPage() {
  const db = new Database();
  const [buttonHapticSetting, setButtonHapticSetting] = useState(true);

  useEffect(() => {
    getData();
  }, [buttonHapticSetting]);

  const storeData = async () => {
    setButtonHapticSetting(!buttonHapticSetting);
    try {
      await AsyncStorage.setItem(
        "buttonHapticSetting",
        buttonHapticSetting.toString()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("hapticSetting");
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button
        title="Delete data"
        onPress={Deletedata}
        style={{ backgroundColor: "blue", padding: 10 }}
      />
      <Switch
        onValueChange={() => {
          storeData();
        }}
        value={buttonHapticSetting}
      />
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
    alignItems: "center",
  },
});
