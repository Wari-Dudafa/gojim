import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Alert,
  StyleSheet,
  Switch,
  Text,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

function SettingsPage(props) {
  const theme = useTheme();
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
      console.error(error);
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
      console.error(error);
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
          style: "destructive",
          onPress: () => {
            db.wipeDatabase();
            Alert.alert("Confirmation", "Data deleted successfully");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const setFirstTimeOpening = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to do this?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            let keyToDelete = "firstTimeOpening";

            try {
              await AsyncStorage.removeItem(keyToDelete);
              Alert.alert("Confirmation", "Proccess completed  successfully");
            } catch (error) {
              console.error("Error deleting key", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Settings" navigation={props.navigation} back />
      <ScrollView>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: theme.colors.onBackground }}>
            Haptic feeback (Only one that works)
          </Text>
          <Switch onValueChange={storeData} value={hapticSetting} />
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: theme.colors.onBackground }}>
            Kilograms (Pounds support coming soon)
          </Text>
          <Switch value />
        </View>

        <Button
          dev
          title="Set first time opening app"
          onPress={setFirstTimeOpening}
        />
        <Button dev title="Initialise database" onPress={() => db.init()} />
        <Button title="Delete data" onPress={deleteData} />
      </ScrollView>
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
