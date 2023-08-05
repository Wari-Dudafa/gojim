import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import DaysStackPage from "./app/pages/DaysStackPage";
import SettingsPage from "./app/pages/SettingsPage";
import FoodPage from "./app/pages/FoodPage";
import Database from "./app/classes/DatabaseClass";
import Button from "./app/components/Button";

export default function App() {
  const Tab = createBottomTabNavigator();
  const db = new Database();
  const [hapticSetting, setHapticSetting] = useState();
  enableScreens();

  useEffect(() => {
    db.init();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => (
              <SafeAreaView style={styles.header}>
                <Text style={styles.headerTitle}>{route.name}</Text>
                <Button style={{}} setHapticSetting={setHapticSetting} />
              </SafeAreaView>
            ),
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
          })}
        >
          <Tab.Screen
            name="DaysStackPage"
            component={DaysStackPage}
            options={{
              tabBarIcon: ({ size, focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="weight"
                    size={focused ? size * 2 : size * 1.3}
                    color={focused ? "#93c244" : "#e6e6e6"}
                  />
                );
              },
            }}
            listeners={({ navigation, route }) => ({
              focus: () => {
                // Do a check to make sure the user cannot go back to the days page once a workout has started
                if (hapticSetting) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
              },
            })}
          />
          <Tab.Screen
            name="FoodPage"
            component={FoodPage}
            options={{
              tabBarIcon: ({ size, focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="bowl-mix"
                    size={focused ? size * 2 : size * 1.3}
                    color={focused ? "#93c244" : "#e6e6e6"}
                  />
                );
              },
            }}
            listeners={() => ({
              focus: () => {
                if (hapticSetting) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
              },
            })}
          />
          <Tab.Screen
            name="SettingsPage"
            component={SettingsPage}
            options={{
              tabBarIcon: ({ size, focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="cog"
                    size={focused ? size * 2 : size * 1.3}
                    color={focused ? "#93c244" : "#e6e6e6"}
                  />
                );
              },
            }}
            listeners={() => ({
              focus: () => {
                if (hapticSetting) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
              },
            })}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 3,
    borderTopColor: "#2e476b",
    height: "10%",
    backgroundColor: "#1f3047",
  },
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
