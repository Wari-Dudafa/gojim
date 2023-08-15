import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
import { Slider } from "@react-native-assets/slider";
import { SegmentedButtons } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";

function GraphPage(props) {
  const db = new Database();
  const day = props.route.params.day;
  const [zoomMultiplier, setZoomMultiplier] = useState(100);
  const [selectedGraph, setSelectedGraph] = useState("activity");
  const theme = useTheme();
  const [lineData, setLineData] = useState([
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ]);

  useEffect(() => {
    getGraphData();
  }, [selectedGraph]);

  const getGraphData = () => {
    if (selectedGraph == "activity") {
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
    } else if (selectedGraph == "weightLifted") {
      let statement = "";
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
          isAnimated
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
    </View>
  );
}

export default GraphPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
