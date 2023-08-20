import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";
import { PieChart } from "react-native-gifted-charts";

function CardBarGraph(props) {
  const db = new Database();
  const theme = useTheme();

  const [exerciseCount, setExerciseCount] = useState(99);
  const [pieChartData, setPieChartData] = useState([
    { value: 30 },
    { value: 40 },
    { value: 20 },
    { value: 20 },
    { value: 20 },
  ]);

  useEffect(() => {
    getPieChartData();
  }, []);

  const getPieChartData = () => {
    let statement = "";
  };

  return (
    <View style={{ position: "absolute", backgroundColor: "red" }}>
      <PieChart
        data={pieChartData}
        innerCircleColor={theme.colors.primary}
        innerCircleBorderColor={theme.colors.outline}
        showValuesAsLabels={true}
        showText
        textSize={18}
        showTextBackground={true}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                {exerciseCount}
              </Text>
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Exercises
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default CardBarGraph;
