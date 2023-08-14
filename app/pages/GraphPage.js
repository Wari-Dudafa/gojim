import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";

import AppBar from "../components/AppBar";

function GraphPage(props) {
  const day = props.route.params.day;
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
      <LineChart
        areaChart
        data={lineData}
        hideDataPoints
        isAnimated
        color1={theme.colors.primary}
        startFillColor1={theme.colors.primary}
        endFillColor1={theme.colors.primary}
        startOpacity={0.8}
        endOpacity={0.1}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{ color: "gray" }}
        xAxisColor="lightgray"
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
