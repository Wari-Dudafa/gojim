import { View } from "react-native";

import Button from "../components/Button";

function StartWorkoutPage({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <Button
        style={{ backgroundColor: "blue", padding: 10 }}
        title="End workout"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
}

export default StartWorkoutPage;
