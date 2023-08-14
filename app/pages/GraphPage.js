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
    { value: 50 },
    { value: 40 },
    { value: 18 },
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
        spacing={68}
        isAnimated
        color1="#8a56ce"
        startFillColor1="#8a56ce"
        endFillColor1="#8a56ce"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{ color: "gray" }}
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: "lightgray",
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: (items) => {
            return (
              <View
                style={{
                  backgroundColor: "#282C3E",
                  borderRadius: 4,
                  justifyContent: "center",
                  paddingLeft: 16,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", padding: 20 }}
                >
                  {items[0].value}
                </Text>
              </View>
            );
          },
        }}
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
