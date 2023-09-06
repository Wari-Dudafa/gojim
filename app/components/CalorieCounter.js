import { View, Dimensions, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTheme } from "react-native-paper";

function CalorieCounter(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;

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
        fill={(2500 / 4000) * 100}
        rotation={-90}
        tintColor={theme.colors.secondary}
        backgroundColor={theme.colors.secondaryContainer}
        arcSweepAngle={180}
        lineCap="round"
      />
      <View style={styles.bottom}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          2500/4000
        </Text>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 20,
          }}
        >
          calories
        </Text>
      </View>
    </View>
  );
}

export default CalorieCounter;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    width: "75%",
    height: "45%",
    alignItems: "center",
  },
});
