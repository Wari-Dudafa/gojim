import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

import SwipingCards from "./SwipingCards";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <SwipingCards />
    </SafeAreaView>
  );
}
