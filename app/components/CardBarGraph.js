import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";

import Database from "../classes/DatabaseClass";

function CardBarGraph(props) {
  const db = new Database();
  const theme = useTheme();
  const [barData, setBarData] = useState([
    {
      value: 1,
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          M
        </Text>
      ),
    },
    {
      value: Math.floor(Math.random() * 1 + 0.5),
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          T
        </Text>
      ),
    },
    {
      value: Math.floor(Math.random() * 1 + 0.5),
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          W
        </Text>
      ),
    },
    {
      value: Math.floor(Math.random() * 1 + 0.5),
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          T
        </Text>
      ),
    },
    {
      value: Math.floor(Math.random() * 1 + 0.5),
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          F
        </Text>
      ),
    },
    {
      value: Math.floor(Math.random() * 1 + 0.5),
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          S
        </Text>
      ),
    },
    {
      value: 1,
      frontColor: theme.colors.onPrimary,
      labelTextStyle: { color: theme.colors.onPrimary },
      topLabelComponent: () => (
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            marginBottom: 6,
          }}
        >
          S
        </Text>
      ),
    },
  ]);

  useEffect(() => {
    getBarGraphData();
  }, []);

  const getBarGraphData = () => {
    // for (let index = 0; index < 1_000_000_000; index++) {}
    let currentDate = new Date();
    let statement =
      "SELECT s.date FROM session s WHERE s.day_id = " +
      props.dayId +
      " ORDER BY s.date DESC LIMIT 7";

    db.sql(statement, (resultSet) => {
      let dates = resultSet.rows._array;

      if (dates.length == 0) {
        // This exercises has never been done
        setBarData([
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                M
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                T
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                W
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                T
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                F
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                S
              </Text>
            ),
          },
          {
            value: 0,
            frontColor: theme.colors.onPrimary,
            labelTextStyle: { color: theme.colors.onPrimary },
            topLabelComponent: () => (
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                S
              </Text>
            ),
          },
        ]);
      } else {
        // Handle data
      }
    });
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BarChart
        yAxisThickness={0}
        xAxisThickness={0}
        barBorderRadius={4}
        initialSpacing={5}
        hideRules
        hideYAxisText
        maxValue={2}
        spacing={10}
        barWidth={24}
        data={barData}
        barStyle={{
          borderColor: theme.colors.outline,
          borderRadius: 4,
          borderWidth: 1,
        }}
      />
    </View>
  );
}

export default CardBarGraph;
