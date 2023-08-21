import { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import SwipingContainer from "../components/SwipingContainer";
import CornerActionButton from "../components/CornerActionButton";
import Database from "../classes/DatabaseClass";
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
      <CornerActionButton
        icon="plus"
        onPress={() => {
          // Make new day
          props.navigation.navigate("AddDaysPage");
        }}
      />
      <SwipingContainer days={days} navigation={props.navigation} />
    </View>
  );
}

export default DaysPage;
