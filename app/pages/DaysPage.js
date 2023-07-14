import { View, TouchableOpacity, Text } from "react-native";

import SwipingCards from "../../SwipingCards";

function DaysPage({ navigation, props }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <SwipingCards />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
        style={{ backgroundColor: "red", position: "absolute" }}
      >
        <Text style={{ color: "#e6e6e6", fontSize: 20 }}>Add a new day</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DaysPage;
