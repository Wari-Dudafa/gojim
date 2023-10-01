import { useState } from "react";
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
import * as Application from "expo-application";

import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

function SettingsPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [hapticSetting, setHapticSetting] = useState(true);

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

  const setFirstTimeOpening = (shouldAskConfirmation) => {
    if (shouldAskConfirmation) {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to go back to setup?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              props.navigation.navigate("SetupStack");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.navigate("SetupStack");
    }
  };

  const deleteAllData = async (shouldAskConfirmation) => {
    if (shouldAskConfirmation) {
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
                setFirstTimeOpening(false);
              } catch (error) {
                console.error("Error deleting key", error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      db.wipeDatabase();
      let keyToDelete = "firstTimeOpening";
      try {
        await AsyncStorage.removeItem(keyToDelete);
        Alert.alert("Confirmation", "Data deleted successfully");
        setFirstTimeOpening(false);
      } catch (error) {
        console.error("Error deleting key", error);
      }
    }
  };

  const deleteDaysData = (shouldAskConfirmation) => {
    if (shouldAskConfirmation) {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete all the days data?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              db.dropTable("days");
              db.dropTable("weight_per_set");
              db.dropTable("reps_per_set");
              db.dropTable("sets");
              db.dropTable("session");
              db.dropTable("exercises");
              db.init();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      db.dropTable("days");
      db.dropTable("weight_per_set");
      db.dropTable("reps_per_set");
      db.dropTable("sets");
      db.dropTable("session");
      db.dropTable("exercises");
      db.init();
    }
  };

  const deleteFoodData = (shouldAskConfirmation) => {
    if (shouldAskConfirmation) {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete all the food data?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              db.dropTable("meals");
              db.init();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      db.dropTable("meals");
      db.init();
    }
  };

  const deleteScaleData = (shouldAskConfirmation) => {
    if (shouldAskConfirmation) {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete all the scale data?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              db.dropTable("user_weight");
              db.init();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      db.dropTable("user_weight");
      db.init();
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
          invisible
        />
        <Button
          title="Back to setup"
          onPress={() => setFirstTimeOpening(true)}
        />
        <Button title="Delete days data" onPress={() => deleteDaysData(true)} />
        <Button title="Delete food data" onPress={() => deleteFoodData(true)} />
        <Button
          title="Delete scale data"
          onPress={() => deleteScaleData(true)}
        />
        <Button title="Delete all data" onPress={() => deleteAllData(true)} />

        <Text style={[styles.creditText, { color: theme.colors.onBackground }]}>
          {Application.applicationName} version{" "}
          {Application.nativeApplicationVersion} created by Waripamo-owei Dudafa
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
