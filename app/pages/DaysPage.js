import { View, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import SwipingContainer from "../components/SwipingContainer";
import Database from "../classes/DatabaseClass";
import { useState, useEffect } from "g";

function DaysPage({ navigation, props }) {
  const db = new Database();
  const [days, setDays] = useState([
    { name: "..." },
    { name: "..." },
    { name: "..." },
  ]);

  useEffect(() => {
    db.sql(
      "SELECT * FROM days",
      (resultSet) => {
        setDays(resultSet.rows._array);
      },
      (error) => {
        Alert.alert("An error occured");
      }
    );
  }, []);

  console.log(days);

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
        <Feather name="check" size={55} color="#e6e6e6" />
      </TouchableOpacity>
      <SwipingContainer days={days} />
    </View>
  );
}

export default DaysPage;
