import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, DeviceEventEmitter } from "react-native";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { LineChart } from "react-native-gifted-charts";
import { Slider } from "@react-native-assets/slider";

import AppBar from "../components/AppBar";
import CountDown from "../components/CountDown";
import CornerActionButton from "../components/CornerActionButton";
import Database from "../classes/DatabaseClass";

function ScalePage(props) {
  const theme = useTheme();
  const db = new Database();
  const [zoomMultiplier, setZoomMultiplier] = useState(100);
  const [showActionButton, setShowActionButton] = useState(false);
  const [targetTime, setTargetTime] = useState("__$$__");
  const [lineData, setLineData] = useState([
    { value: 0, dataPointColor: theme.colors.secondary },
  ]);

  useEffect(() => {
    getGraphData();
    getLastLogTime();
    DeviceEventEmitter.addListener("event.newUserWeightAdded", () => {
      setShowActionButton(false);
      getLastLogTime();
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getGraphData();
    }, [])
  );

  const getGraphData = () => {
    let statement = "SELECT * FROM user_weight";
    db.sql(statement, (resultSet) => {
      let userWeightData = resultSet.rows._array;
      let lineData = [];
      lineData.push({
        value: 0,
        dataPointColor: theme.colors.secondary,
      });
      for (let index = 0; index < userWeightData.length; index++) {
        let date = new Date(userWeightData[index].date);
        let dateStr =
          "" +
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          "";
        let value = {
          value: userWeightData[index].weight_kg,
          dataPointText: userWeightData[index].weight_kg,
          textShiftY: -10,
          textShiftX: -5,
          label: dateStr,
          dataPointColor: theme.colors.secondary,
        };
        lineData.push(value);
      }
      setLineData(lineData);
    });
  };

  const getLastLogTime = () => {
    let statement = "SELECT MAX(date) AS last_log_time FROM user_weight";
    db.sql(statement, (resultSet) => {
      let lastLogTime = resultSet.rows._array[0].last_log_time;
      if (lastLogTime == null) {
        setShowActionButton(true);
      } else {
        let nextLogTime = new Date(lastLogTime);
        nextLogTime.setDate(nextLogTime.getDate() + 1);
        setTargetTime(nextLogTime.toString());
      }
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Scale" settings navigation={props.navigation} />

      {showActionButton ? (
        <CornerActionButton
          icon="plus"
          onPress={() => {
            // Add new weight entry
            props.navigation.navigate("WeightEntryPage");
          }}
        />
      ) : (
        <CountDown
          targetTime={targetTime}
          prefixText={"Next weight log in: "}
          timerRanOut={setShowActionButton} // use state funtion, set it to true
        />
      )}

      <View
        style={{
          paddingBottom: 30,
          flex: 1,
        }}
      >
        <LineChart
          areaChart
          data={lineData}
          height={500}
          spacing={zoomMultiplier}
          color1={theme.colors.primary}
          startFillColor1={theme.colors.primary}
          endFillColor1={theme.colors.primary}
          startOpacity={0.8}
          endOpacity={0}
          initialSpacing={20}
          endSpacing={900}
          noOfSections={4}
          yAxisThickness={0}
          rulesType="solid"
          xAxisLabelTextStyle={{ color: theme.colors.onBackground }}
          rulesColor={theme.colors.onBackground}
          yAxisTextStyle={{ color: theme.colors.onBackground }}
          xAxisColor={theme.colors.onBackground}
        />
        <Slider
          style={{
            right: 0,
            height: "90%",
            paddingTop: 25,
            position: "absolute",
            alignSelf: "center",
          }}
          vertical
          value={zoomMultiplier}
          minimumValue={1}
          maximumValue={200}
          thumbSize={20}
          minimumTrackTintColor={theme.colors.onBackground}
          maximumTrackTintColor={theme.colors.onBackground}
          thumbTintColor={theme.colors.primary}
          onValueChange={setZoomMultiplier}
        />
      </View>
    </View>
  );
}

export default ScalePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
