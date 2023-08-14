import { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import SwipingContainer from "../components/SwipingContainer";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

function DaysPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [days, setDays] = useState([]);

  useEffect(() => {
    db.init();
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.sql("SELECT * FROM days", (resultSet) => {
        setDays(resultSet.rows._array);
      });
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title="Days" settings navigation={props.navigation} />
      <Button
        onPress={() => {
          props.navigation.navigate("AddDaysPage");
        }}
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          backgroundColor: theme.colors.secondary,
          borderRadius: 5,
          padding: 5,
          zIndex: 100,
        }}
      >
        <Feather name="plus" size={55} color={theme.colors.onSecondary} />
      </Button>
      <SwipingContainer days={days} navigation={props.navigation} />
    </View>
  );
}

export default DaysPage;
