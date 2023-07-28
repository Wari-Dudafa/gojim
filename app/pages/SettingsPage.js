import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Alert, StyleSheet, Switch, Text } from "react-native";

import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function SettingsPage() {
  const db = new Database();
  const [hapticSetting, setHapticSetting] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async () => {
    const newHapticSetting = !hapticSetting;
    setHapticSetting(newHapticSetting);
    try {
      await AsyncStorage.setItem("hapticSetting", newHapticSetting.toString());
    } catch (error) {
      Alert.alert("An error occured, please try again later");
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("hapticSetting");
      if (value == "true") {
        // Setting is true so set the setting to true
        setHapticSetting(true);
      } else if (value == "false") {
        // Setting is false so set the setting to false
        setHapticSetting(false);
      }
    } catch (error) {
      Alert.alert("An error occured, please try again later");
      console.log(error);
    }
  };

  const deleteData = () => {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "#e6e6e6", paddingRight: 10 }}>
          Haptic feeback
        </Text>
        <Switch onValueChange={storeData} value={hapticSetting} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "#e6e6e6", paddingRight: 10 }}>Kilograms</Text>
        <Switch />
        <Text style={{ color: "#e6e6e6", paddingLeft: 10 }}>Pounds</Text>
      </View>
      <Button title="Delete data" onPress={deleteData} />
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
