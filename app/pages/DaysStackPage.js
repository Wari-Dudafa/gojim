import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DaysPage from "./DaysPage";
import AddDaysPage from "./AddDaysPage";
import EditDayPage from "./EditDayPage";
import StartDayPage from "./StartDayPage";
import StartExercisePage from "./StartExercisePage";

function DaysStackPage() {
  const Stack = createNativeStackNavigator();
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

export default DaysStackPage;
