import { View, Text } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

import Input from "./Input";
import Button from "../Button";
import colours from "../../utils/Colours";
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
            <Input number={props.setNumber} />
            <Input number={weight} afterText={"kg"} edit />
            <Input number={reps} afterText={" reps"} edit />
            <Input number={reps * weight} afterText={"J"} />
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
            <Input number={props.setNumber} />
            <Input number={lastWeight} afterText={"kg"} />
            <Input number={lastReps} afterText={" reps"} />
            <Input number={lastReps * lastWeight} afterText={"J"} />
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
            backgroundColor: "coral",
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
