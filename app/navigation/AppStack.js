import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";

import AddDaysPage from "../pages/AddDaysPage";
import EditDayPage from "../pages/EditDayPage";
import TabBarStack from "./TabBarStack";
import StartDayPage from "../pages/StartDayPage";
import StartExercisePage from "../pages/StartExercisePage";
import SettingsPage from "../pages/SettingsPage";
import GraphPage from "../pages/GraphPage";
import WeightEntryPage from "../pages/WeightEntryPage";

function AppStack(props) {
  const Stack = createNativeStackNavigator();
  enableScreens();
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        initialRouteName="TabBarStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="StartDayPage" component={StartDayPage} />
        <Stack.Screen name="StartExercisePage" component={StartExercisePage} />
        <Stack.Screen name="AddDaysPage" component={AddDaysPage} />
        <Stack.Screen name="EditDayPage" component={EditDayPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="GraphPage" component={GraphPage} />
        <Stack.Screen name="WeightEntryPage" component={WeightEntryPage} />

        <Stack.Screen name="TabBarStack" component={TabBarStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
