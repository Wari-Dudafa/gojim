import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "react-native-paper";

import SettingsPage from "../pages/SettingsPage";
import FoodPage from "../pages/FoodPage";
import Button from "../components/Button";
import DaysStack from "../navigation/DaysStack";

function AppStack() {
  const theme = useTheme();
  const Tab = createBottomTabNavigator();
  const [hapticSetting, setHapticSetting] = useState();

  enableScreens();

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => (
              <SafeAreaView
                style={[
                  styles.header,
                  {
                    backgroundColor: theme.colors.elevation.level5,
                    borderBottomColor: theme.colors.elevation.level3,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerTitle,
                    { color: theme.colors.onBackground },
                  ]}
                >
                  {route.name}
                </Text>
                <Button style={{}} setHapticSetting={setHapticSetting} />
              </SafeAreaView>
            ),
            tabBarShowLabel: false,
            tabBarStyle: [
              styles.tabBar,
              { backgroundColor: theme.colors.elevation.level5 },
            ],
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
                    color={
                      focused ? theme.colors.primary : theme.colors.onPrimary
                    }
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
                    color={
                      focused ? theme.colors.primary : theme.colors.onPrimary
                    }
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
                    color={
                      focused ? theme.colors.primary : theme.colors.onPrimary
                    }
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
  },
  header: {
    backgroundColor: "red",
    height: 85,
    borderBottomWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
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
