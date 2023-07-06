import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import * as SQLite from "expo-sqlite";

import DaysStackPage from "./app/pages/DaysStackPage";
import SettingsPage from "./app/pages/SettingsPage";
import FoodPage from "./app/pages/FoodPage";
import AddDaysPage from "./app/pages/AddDaysPage";

export default function App() {
  const Tab = createBottomTabNavigator();
  const db = SQLite.openDatabase("fitone.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS user (name TEXT)",
        null,
        null,
        (txObj, error) => console.log(error)
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => (
              <SafeAreaView style={styles.header}>
                <Text style={styles.headerTitle}>{route.name}</Text>
              </SafeAreaView>
            ),
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 3,
              borderTopColor: "#2e476b",
              height: 89,
              paddingTop: 25,
              backgroundColor: "#1f3047",
              justifyContent: "space-around",
              alignItems: "center",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          })}
        >
          <Tab.Screen name="DaysStackPage" component={DaysStackPage} />
          <Tab.Screen name="FoodPage" component={FoodPage} />
          <Tab.Screen name="SettingsPage" component={SettingsPage} />
          <Tab.Screen
            screenOptions={{ presentation: "modal" }}
            name="AddDaysPage"
            component={AddDaysPage}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: "#1f3047",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#e6e6e6",
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
});
