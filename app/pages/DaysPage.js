import { useState, useCallback } from "react";
import { View } from "react-native";
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
  const [streak, setStreak] = useState(0);
  const [secondaryMessage, setSecondaryMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      getDays();
      getWeeklyStreak();
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
    let streak = 0;

    if (streak == 0) {
      setSecondaryMessage("Only up from here!");
    } else if (streak == 1) {
      setSecondaryMessage("Starting is the first step!");
    } else {
      setSecondaryMessage("Keep up the good work!");
    }
    setStreak(streak);
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
        streak={streak}
        secondaryMessage={secondaryMessage}
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
