import { View, Text } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

import colours from "../../utils/Colours";
import Button from "../Button";
import springConfig from "../../utils/SpringConfig";

function Set(props) {
  const opacity = useSharedValue(1);

  const reps = Math.floor(Math.random() * 12) + 1;
  const weight = Math.floor(Math.random() * 100) + 1;
  const lastReps = Math.floor(Math.random() * 12) + 1;
  const lastWeight = Math.floor(Math.random() * 100) + 1;

  return (
    <Animated.View
      style={{
        padding: 2,
        opacity: opacity, // This could be temporary
        marginBottom: 40,
        borderRadius: 10,
        backgroundColor: colours.accent,
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: colours.primary,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {props.setNumber}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {weight}kg
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {reps} reps
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {weight * reps}J
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: colours.secondary,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colours.text,
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {props.setNumber}
            </Text>
            <Text
              style={{
                color: colours.text,
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {lastWeight}kg
            </Text>
            <Text
              style={{
                color: colours.text,
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {lastReps} reps
            </Text>
            <Text
              style={{
                color: colours.text,
                fontFamily: "quicksand",
                fontSize: 20,
              }}
            >
              {lastWeight * lastReps}J
            </Text>
          </View>
        </View>

        <Button
          icon={"trash-can"}
          iconSize={20}
          style={{
            right: 0,
            width: 40,
            height: 40,
            bottom: "-35%",
            borderRadius: 50,
            position: "absolute",
            backgroundColor: "darkorange",
          }}
          onPress={() => {
            opacity.value = withSpring(
              0,
              springConfig,
              () => {
                runOnJS(props.deleteSet)(props.index);
                opacity.value = 1;
              },
              50
            );
          }}
        />
      </View>
    </Animated.View>
  );
}

export default Set;
