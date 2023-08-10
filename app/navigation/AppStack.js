import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import SettingsPage from "../pages/SettingsPage";
import FoodPage from "../pages/FoodPage";
import Button from "../components/Button";
import DaysStack from "../navigation/DaysStack";

function AppStack() {
  const Tab = createBottomTabNavigator();
  const [hapticSetting, setHapticSetting] = useState();

  enableScreens();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
            name="DaysStack"
            component={DaysStack}
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

export default AppStack;

const styles = StyleSheet.create({
  tabBar: {
    height: "10%",
    borderTopWidth: 0,
    backgroundColor: "#1f3047",
  },
  header: {
    backgroundColor: "red",
    height: 85,
    borderBottomWidth: 3,
    borderBottomColor: "#2e476b",
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
