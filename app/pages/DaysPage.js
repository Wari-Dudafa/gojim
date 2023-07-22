import { View, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import SwipingContainer from "../components/SwipingContainer";
import Database from "../classes/DatabaseClass";

function DaysPage({ navigation, props }) {
  const db = new Database();
  db.sql(
    "SELECT * FROM exercises",
    (resultSet) => {
      console.log(resultSet.rows._array);
    },
    (error) => {
      Alert.alert("An error occured");
    }
  );

  const cards = [
    // Temporary data will reading from the database works
    { name: "0" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "10" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          backgroundColor: "#4490c2",
          borderRadius: 50,
          padding: 5,
        }}
      >
        <Feather name="plus" size={60} color="#e6e6e6" />
      </TouchableOpacity>

      <SwipingContainer days={cards} />
    </View>
  );
}

export default DaysPage;
