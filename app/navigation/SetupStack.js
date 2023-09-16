import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import WelcomePage from "../pages/setup/WelcomePage";
import BulkingOrCuttingPage from "../pages/setup/BulkingOrCuttingPage";
import SetCurrentBodySpecsPage from "../pages/setup/SetCurrentBodySpecsPage";
import SetMacrosPage from "../pages/setup/SetMacrosPage";

function AppStack(props) {
  const Stack = createNativeStackNavigator();
  enableScreens();

  return (
    <Stack.Navigator
      initialRouteName={"WelcomePage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen
        name="BulkingOrCuttingPage"
        component={BulkingOrCuttingPage}
      />
      <Stack.Screen
        name="SetCurrentBodySpecsPage"
        component={SetCurrentBodySpecsPage}
      />
      <Stack.Screen name="SetMacrosPage" component={SetMacrosPage} />
    </Stack.Navigator>
  );
}

export default AppStack;
