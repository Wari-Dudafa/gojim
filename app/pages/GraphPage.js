import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
import { Slider } from "@react-native-assets/slider";
import { SegmentedButtons } from "react-native-paper";

import AppBar from "../components/AppBar";

function GraphPage(props) {
  const day = props.route.params.day;
  const [zoomMultiplier, setZoomMultiplier] = useState(100);
  const [selectedGraph, setSelectedGraph] = useState(1);
  const theme = useTheme();
  const lineData = [
    { value: 70 },
    { value: 36 },
    { value: 60 },
    { value: 40 },
    { value: 40 },
    { value: 18 },
    { value: 38 },
    { value: 80 },
    { value: 38 },
  ];
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Graph" settings navigation={props.navigation} back />

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
          minimumValue={0}
          maximumValue={200}
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
            value: "graph1",
            label: "graph1",
          },
          {
            value: "graph2",
            label: "graph2",
          },
          {
            value: "graph3",
            label: "graph3",
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
