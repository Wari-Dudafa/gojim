import { View, TouchableOpacity, Text } from "react-native";

import SwipingDemo from "../../SwipingDemo";

function DaysPage({ navigation, props }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
        style={{ backgroundColor: "red" }}
      >
        <Text style={{ color: "#e6e6e6", fontSize: 20 }}>Add a new day</Text>
      </TouchableOpacity>

      <SwipingDemo />
    </View>
  );
}

export default DaysPage;
