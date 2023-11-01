import { View, Text, StatusBar } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar />
      <Text>Gojim 2.0</Text>
    </View>
  );
}
