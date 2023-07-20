import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import SwipingContainer from "../components/SwipingContainer";

function DaysPage({ navigation, props }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
        style={{ position: "absolute", bottom: 15, right: 15, backgroundColor: '#4490c2', borderRadius: 50, padding: 5 }}
      >
        <Feather name="plus" size={60} color="#e6e6e6" />
      </TouchableOpacity>

      <SwipingContainer />
    </View>
  );
}

export default DaysPage;
