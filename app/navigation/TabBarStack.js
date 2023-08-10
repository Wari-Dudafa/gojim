import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import SettingsPage from "../pages/SettingsPage";
import FoodPage from "../pages/FoodPage";
import DaysPage from "../pages/DaysPage";

function TabBarStack() {
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator();

  enableScreens();

  return (
    <>
      <Tab.Navigator
        labeled={false}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onPrimary}
        barStyle={{
          backgroundColor: theme.colors.elevation.level3,
        }}
      >
        <Tab.Screen
          name="DaysPage"
          component={DaysPage}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="weight" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="FoodPage"
          component={FoodPage}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bowl-mix" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabBarStack;
