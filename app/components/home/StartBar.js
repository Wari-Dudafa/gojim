import { View, Text } from "react-native";

import Button from "../Button";
import colours from "../../utils/Colours";

function StartBar(props) {
  return (
    <View style={{ flex: 10, padding: 5 }}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          padding: 5,
          paddingHorizontal: 10,
        }}
      >
        <Button
          style={{
            backgroundColor: colours.secondary,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            flex: 1,
            marginRight: 2.5,
          }}
          icon={props.shoudLoopWorkouts ? "lock-open" : "lock"}
          iconColor={colours.primary}
          iconSize={40}
          onPress={() => {
            props.setShoudLoopWorkouts(!props.shoudLoopWorkouts);
          }}
        />
        <Button
          onPress={() => {
            if (props.workouts.length == 0) {
              Alert.alert("You need to make a workout first");
            } else {
              if (props.currentWorkout) {
                if (
                  props.currentWorkout.id !=
                  props.workouts[props.workoutIndex].id
                ) {
                  Alert.alert(
                    "Please end your current workout before starting another one"
                  );
                }
              } else {
                props.setCurrentWorkout(props.workouts[props.workoutIndex]);
              }
            }
          }}
          style={{
            flex: 2,
            marginHorizontal: 2.5,
            backgroundColor: colours.secondary,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: colours.text,
              fontFamily: "quicksand",
            }}
          >
            {props.startWorkoutMesssage}
          </Text>
        </Button>

        <Button
          iconSize={40}
          icon={"pencil"}
          style={{
            flex: 1,
            marginLeft: 2.5,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: colours.secondary,
          }}
          iconColor={colours.primary}
        />
      </View>
    </View>
  );
}

export default StartBar;
