import { View, Button } from "react-native";

function StartWorkoutPage({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <Button
        title="End workout"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
}

export default StartWorkoutPage;
