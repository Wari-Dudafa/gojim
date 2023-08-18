import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
import { Slider } from "@react-native-assets/slider";
import { SegmentedButtons } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import ExerciseWithButton from "../components/ExerciseWithButton";

function GraphPage(props) {
  const db = new Database();
  const day = props.route.params.day;
  const [zoomMultiplier, setZoomMultiplier] = useState(100);
  const [selectedGraph, setSelectedGraph] = useState("activity");
  const [showExercises, setShowExercises] = useState(false);
  const [exercises, setExercises] = useState([]);
  const theme = useTheme();
  const [lineData, setLineData] = useState([{ value: 0 }]);

  useEffect(() => {
    getGraphData();
  }, [selectedGraph]);

  const getGraphData = () => {
    if (selectedGraph == "activity") {
      getActivityGraphData();
      setShowExercises(false);
    } else if (selectedGraph == "weightLifted") {
      getExercises();
      setShowExercises(true);
    }
    // Adding more graphs requires more else ifs for each graph
  };

  const getActivityGraphData = () => {
    let statement = "";
    setLineData([
      { value: 38 },
      { value: 80 },
      { value: 38 },
      { value: 40 },
      { value: 40 },
      { value: 60 },
      { value: 36 },
      { value: 70 },
      { value: 18 },
    ]);
  };

  const getExercises = () => {
    let statement = "SELECT * FROM exercises WHERE day_id = " + day.id;
    db.sql(statement, (resultSet) => {
      setExercises(resultSet.rows._array);
    });
    setLineData([
      { value: 40 },
      { value: 36 },
      { value: 70 },
      { value: 18 },
      { value: 38 },
      { value: 38 },
      { value: 40 },
      { value: 60 },
      { value: 80 },
    ]);
  };

  const getExerciseGraphData = (exercise) => {
    // Get needed data
    let statement =
      "SELECT wps.weight_kg, wps.weight_lbs, s.date " +
      "FROM weight_per_set wps " +
      "JOIN sets st ON wps.sets_id = st.id " +
      "JOIN session s ON st.session_id = s.id " +
      "WHERE st.exercise_id = " +
      exercise.id +
      " ORDER BY s.date";

    db.sql(statement, (resultSet) => {
      let result = resultSet.rows._array;
      console.log(result);
    });
  };

  const DisplayExerciseOptions = () => {
    if (exercises.length > 0 && showExercises) {
      return (
        <FlatList
          data={exercises}
          renderItem={({ item, index }) => (
            <ExerciseWithButton
              exercise={item}
              buttonIcon="chart-line"
              key={index}
              index={index}
              lastIndex={exercises.length - 1}
              onPress={() => {
                getExerciseGraphData(item);
              }}
            />
          )}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Graph" navigation={props.navigation} back />

      <View
        style={{
          backgroundColor: theme.colors.elevation.level2,
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
          paddingBottom: 30,
          marginBottom: 20,
        }}
      >
        <LineChart
          areaChart
          data={lineData}
          hideDataPoints
          height={300}
          spacing={zoomMultiplier}
          color1={theme.colors.primary}
          startFillColor1={theme.colors.primary}
          endFillColor1={theme.colors.primary}
          startOpacity={0.8}
          endOpacity={0}
          initialSpacing={0}
          endSpacing={900}
          noOfSections={4}
          yAxisThickness={0}
          rulesType="solid"
          rulesColor={theme.colors.onBackground}
          yAxisTextStyle={{ color: theme.colors.onBackground }}
          xAxisColor={theme.colors.onBackground}
        />
        <Slider
          style={{
            right: 0,
            height: 350,
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

      <SegmentedButtons
        value={selectedGraph}
        onValueChange={setSelectedGraph}
        buttons={[
          {
            value: "activity",
            label: "Activity",
          },
          {
            value: "weightLifted",
            label: "Weight Lifted",
          },
        ]}
      />
      <DisplayExerciseOptions />
    </View>
  );
}

export default GraphPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
