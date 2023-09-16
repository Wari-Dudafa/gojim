import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import WelcomePage from "../pages/setup/WelcomePage";

function AppStack(props) {
  const Stack = createNativeStackNavigator();
  enableScreens();
  
  return (
    <Stack.Navigator
      initialRouteName={"WelcomePage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
    </Stack.Navigator>
  );
}

export default AppStack;
