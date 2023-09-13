import { useState, useCallback } from "react";
import { View, Alert, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import SwipingContainer from "../components/SwipingContainer";
import CornerActionButton from "../components/CornerActionButton";
import Database from "../classes/DatabaseClass";
import AppBar from "../components/AppBar";

function DaysPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [days, setDays] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getDays();
    }, [])
  );

  const getDays = () => {
    let statement = "SELECT * FROM days";
    db.sql(statement, (resultSet) => {
      let days = resultSet.rows._array;
      setDays(days);
    });
  };

  const getWeeklyStreak = () => {
    let streak = 5000;
    let secondaryMessage;

    // Calculate the weekly streak

    if (streak == 0) {
      secondaryMessage = "Only up from here!";
    } else if (streak == 1) {
      secondaryMessage = "Starting is the first step!";
    } else {
      secondaryMessage = "Keep up the good work!";
    }

    Alert.alert(
      "Your weekly gym streak is: " + streak + " " + secondaryMessage
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <AppBar
        title="Days"
        settings
        weeklyStreak
        onPressStreak={getWeeklyStreak}
        navigation={props.navigation}
      />
      <CornerActionButton
        icon="plus"
        onPress={() => {
          // Make new day
          props.navigation.navigate("AddDaysPage");
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <SwipingContainer days={days} navigation={props.navigation} />
      </View>
    </View>
  );
}

export default DaysPage;
