import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";
import { PieChart } from "react-native-gifted-charts";

function CardBarGraph(props) {
  const db = new Database();
  const theme = useTheme();

  const [plural, setPlural] = useState(true);
  const [exerciseCount, setExerciseCount] = useState("");
  const [pieChartData, setPieChartData] = useState([
    { value: 30, color: theme.colors.backdrop },
    { value: 40, color: theme.colors.backdrop },
    { value: 20, color: theme.colors.backdrop },
    { value: 20, color: theme.colors.backdrop },
    { value: 20, color: theme.colors.backdrop },
  ]);

  useEffect(() => {
    getExerciseCount();
    getPieChartData();
  }, []);

  const getPieChartData = () => {
    let statement = "";
  };

  const getExerciseCount = () => {
    let statement =
      "SELECT id FROM exercises WHERE day_id = " + props.dayId + "";
    db.sql(statement, (resultSet) => {
      let exerciseCount = resultSet.rows.length;
      if (exerciseCount == 1) {
        setPlural(false);
      }
      setExerciseCount(exerciseCount);
    });
  };

  return (
    <View style={{ paddingLeft: 15, paddingTop: 20 }}>
      <PieChart
        strokeColor="white"
        strokeWidth={1}
        data={pieChartData}
        innerCircleColor={theme.colors.primary}
        innerCircleBorderColor={theme.colors.outline}
        showValuesAsLabels={true}
        showText
        outline
        textSize={15}
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
              {plural ? (
                <Text
                  style={{
                    color: theme.colors.onPrimary,
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Exercises
                </Text>
              ) : (
                <Text
                  style={{
                    color: theme.colors.onPrimary,
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Exercise
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

export default CardBarGraph;
