import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import DaysPage from "../pages/DaysPage";
import AddDaysPage from "../pages/AddDaysPage";
import EditDayPage from "../pages/EditDayPage";
import StartDayPage from "../pages/StartDayPage";
import StartExercisePage from "../pages/StartExercisePage";

function DaysStack() {
  const Stack = createNativeStackNavigator();
  enableScreens();
  return (
    <Stack.Navigator
      initialRouteName="DaysPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DaysPage" component={DaysPage} />
      <Stack.Screen name="StartDayPage" component={StartDayPage} />
      <Stack.Screen name="StartExercisePage" component={StartExercisePage} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddDaysPage" component={AddDaysPage} />
        <Stack.Screen name="EditDayPage" component={EditDayPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default DaysStack;
