import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import SwipingCards from "./SwipingCards";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <SwipingCards />
    </View>
  );
}
