import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DaysPage from "./DaysPage";
import AddDaysPage from "./AddDaysPage";
import EditDayPage from "./EditDayPage";
import StartWorkoutPage from "./StartWorkoutPage";

function DaysStackPage() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="DaysPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DaysPage" component={DaysPage} />
      <Stack.Screen
        name="StartWorkoutPage"
        component={StartWorkoutPage}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddDaysPage" component={AddDaysPage} />
        <Stack.Screen name="EditDayPage" component={EditDayPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default DaysStackPage;
