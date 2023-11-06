import { useState } from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

import colours from "../utils/colours";
import Button from "../components/Button";
import Workout from "../classes/Workout";

function HomePage(props) {
  const [shoudLoopWorkouts, setShoudLoopWorkouts] = useState(true);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const workouts = Workout.getAllWorkouts();
  const workoutsProgressBar = useSharedValue("0%");
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const exercisesInWorkout = () => {
    let allNames = "";
    let workout = workouts[currentWorkout];
    let exercisesInWorkout = workout.getExercises();

    for (let index = 0; index < exercisesInWorkout.length; index++) {
      let exercise = exercisesInWorkout[index];

      allNames = allNames + exercise.name;

      if (index != exercisesInWorkout.length - 1) {
        allNames = allNames + ", ";
      } else {
        allNames = allNames + ".";
      }
    }

    return allNames;
  };

  return (
    <>
      <Text
        style={{
          fontFamily: "quicksand-bold",
          color: colours.text,
          fontSize: 40,
          padding: 10,
        }}
      >
        Your workouts
      </Text>
      <View style={{ flex: 10, padding: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            padding: 5,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colours.secondary,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flex: 1,
              marginRight: 2.5,
            }}
          >
            <Button
              icon={shoudLoopWorkouts ? "lock-open" : "lock"}
              iconColor={
                shoudLoopWorkouts ? colours.primary : colours.background
              }
              iconSize={shoudLoopWorkouts ? 50 : 45}
              onPress={() => {
                setShoudLoopWorkouts(!shoudLoopWorkouts);
              }}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              marginLeft: 2.5,
              backgroundColor: colours.secondary,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              flex: 3,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Carousel
              loop
              width={270}
              autoPlay={shoudLoopWorkouts}
              data={workouts}
              scrollAnimationDuration={1000}
              autoPlayInterval={5000}
              onSnapToItem={(index) => {
                runOnJS(setCurrentWorkout)(index);
                workoutsProgressBar.value = withSpring(
                  parseInt((index / workouts.length) * 100) + "%",
                  springConfig
                );
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "quicksand",
                      textAlign: "center",
                      fontSize: 35,
                      color: colours.accent,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            />
            <Animated.View
              style={{
                backgroundColor: colours.accent,
                position: "absolute",
                bottom: "0%",
                left: "0%",
                height: 2,
                width: workoutsProgressBar,
              }}
            />
          </View>
        </View>
      </View>
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
              borderRadius: 10,
              flex: 1,
              marginRight: 2.5,
            }}
          >
            <Text
              style={{
                fontFamily: "quicksand",
                textAlign: "center",
                fontSize: 30,
                color: colours.text,
              }}
            >
              Start empty workout
            </Text>
          </Button>
        </View>
      </View>
      <View style={{ flex: 50, padding: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            padding: 5,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colours.secondary,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flex: 1,
              marginRight: 2.5,
            }}
          ></View>
          <View
            style={{
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              flex: 1,
              marginLeft: 2.5,
            }}
          >
            <View
              style={{
                backgroundColor: colours.secondary,
                borderTopRightRadius: 10,
                flex: 1,
                marginBottom: 2.5,
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontFamily: "quicksand",
                  textAlign: "center",
                  fontSize: 20,
                  color: colours.text,
                }}
              >
                {exercisesInWorkout()}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colours.secondary,
                borderBottomRightRadius: 10,
                flex: 1,
                marginTop: 2.5,
              }}
            ></View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: 5 }} />
    </>
  );
}

export default HomePage;
