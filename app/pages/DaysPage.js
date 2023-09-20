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

  const areDatesInSameWeek = (date1, date2) => {
    // Get the year and week number for the first date
    let year1 = date1.getFullYear();
    let week1 = getWeekNumber(date1);

    // Get the year and week number for the second date
    let year2 = date2.getFullYear();
    let week2 = getWeekNumber(date2);

    // Check if the years and week numbers are the same
    return year1 === year2 && week1 === week2;
  };

  const getWeekNumber = (date) => {
    let target = new Date(date.valueOf());
    let dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);

    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
  };

  const getWeeklyStreak = () => {
    let statement = "SELECT * FROM session";
    db.sql(statement, (resultSet) => {
      let streak = 0;
      let shouldCalculateStreak = true;
      let secondaryMessage;
      let lastSession;
      let sessions = resultSet.rows._array.reverse();

      // Calculate the weekly streak
      if (sessions.length == 0) {
        // Do nothing
      } else {
        for (let index = 0; index < sessions.length; index++) {
          let session = new Date(sessions[index].date);

          if (index == 0) {
            lastSession = new Date("04/09/2004");
          } else {
            lastSession = new Date(sessions[index - 1].date);
          }

          if (
            areDatesInSameWeek(lastSession, session) &&
            shouldCalculateStreak
          ) {
            if (lastSession.getDate() == session.getDate()) {
              // Do nothing
            } else {
              streak++;
            }
          } else {
            shouldCalculateStreak = false;
          }
        }
      }

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
    });
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
