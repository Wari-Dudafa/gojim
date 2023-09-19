import { useEffect, useState } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CalorieCounter(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [maximum, setMaximum] = useState(0);

  useEffect(() => {
    setCaloriesConsumed(props.data);
    getMaximum();
  }, [props.data]);

  const getMaximum = async () => {
    try {
      const value = await AsyncStorage.getItem("calories");

      if (value === null) {
        setMaximum(3500);
      } else {
        setMaximum(parseInt(value));
      }
    } catch (error) {
      console.error(error);
      setMaximum(3500);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedCircularProgress
        size={screenWidth * 0.75}
        width={20}
        fill={(caloriesConsumed / maximum) * 100}
        rotation={-90}
        tintColor={theme.colors.secondary}
        backgroundColor={theme.colors.secondaryContainer}
        arcSweepAngle={180}
        lineCap="round"
      />
      <View style={styles.bottom}>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            fontSize: 35,
          }}
        >
          {caloriesConsumed}
        </Text>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 20,
          }}
        >
          of {maximum}
        </Text>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 15,
          }}
        >
          Calories
        </Text>
      </View>
    </View>
  );
}

export default CalorieCounter;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    width: "100%",
    height: "60%",
    alignItems: "center",
  },
});
