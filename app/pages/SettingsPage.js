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
          onPress: async () => {
            db.wipeDatabase();
            let keyToDelete = "firstTimeOpening";
            try {
              await AsyncStorage.removeItem(keyToDelete);
              Alert.alert("Confirmation", "Data deleted successfully");
            } catch (error) {
              console.error("Error deleting key", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const setFirstTimeOpening = async () => {
    let keyToDelete = "firstTimeOpening";

    try {
      await AsyncStorage.removeItem(keyToDelete);
      props.navigation.navigate("SetupStack");
    } catch (error) {
      Alert.alert("An error occured going back, please try again later");
      console.error(error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Settings" navigation={props.navigation} back />
      <ScrollView>
        <View style={styles.switchText}>
          <Text style={{ color: theme.colors.onBackground }}>
            Kilograms (Pounds support coming soon)
          </Text>
          <Switch
            value
            trackColor={{ true: theme.colors.primary }}
            thumbColor={theme.colors.surface}
          />
        </View>

        <Button
          title="Initialise database"
          onPress={() => db.init()}
          visible={false}
        />
        <Button
          title="Drop table"
          onPress={() => db.dropTable("")}
          visible={false}
        />
        <Button title="Back to setup" onPress={setFirstTimeOpening} />
        <Button title="Delete all data" onPress={deleteData} />
        <Text style={[styles.creditText, { color: theme.colors.onBackground }]}>
          created by Waripamo-owei Dudafa
        </Text>
      </ScrollView>
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchText: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  creditText: {
    textAlign: "center",
    padding: 10,
    fontSize: 10,
  },
});
