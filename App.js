import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import DaysPage from "./app/pages/DaysPage";
import SettingsPage from "./app/pages/SettingsPage";
import FoodPage from "./app/pages/FoodPage";

export default function App() {
  const Tab = createBottomTabNavigator();
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
              borderTopWidth: 0,
              paddingHorizontal: 10,
              height: 80,
              paddingTop: 30,
              backgroundColor: "green",
              justifyContent: "space-around",
              alignItems: "center",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          })}
        >
          <Tab.Screen name="DaysPage" component={DaysPage} />
          <Tab.Screen name="FoodPage" component={FoodPage} />
          <Tab.Screen name="SettingsPage" component={SettingsPage} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
