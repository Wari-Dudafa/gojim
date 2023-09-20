import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import FoodPage from "../pages/FoodPage";
import DaysPage from "../pages/DaysPage";
import ScalePage from "../pages/ScalePage";

function TabBarStack() {
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator();

  enableScreens();

  return (
    <Tab.Navigator
      theme={{
        colors: { secondaryContainer: theme.colors.primaryContainer },
      }}
      labeled={false}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.outline}
      barStyle={{
        backgroundColor: theme.colors.elevation.level2,
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
      <Tab.Screen
        name="ScalePage"
        component={ScalePage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="scale-bathroom"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabBarStack;
