import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DaysPage from "./DaysPage";
import AddDaysPage from "./AddDaysPage";

function DaysStackPage(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="DaysPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DaysPage" component={DaysPage} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddDaysPage" component={AddDaysPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default DaysStackPage;
