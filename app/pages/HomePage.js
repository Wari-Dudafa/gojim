import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

import colours from "../utils/colours";
import Button from "../components/Button";
import Workout from "../backend/Workout";

function HomePage(props) {
  const [shoudLoopWorkouts, setShoudLoopWorkouts] = useState(true);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const startWorkoutMesssages = [
    "Start selected workout",
    "Doing selected workout",
    "Start workout instead",
  ];
  const [startWorkoutMesssage, setStartWorkoutMessage] = useState(
    startWorkoutMesssages[0]
  );

  useEffect(() => {
    Workout.getAllWorkouts().then((workouts) => {
      setTimeout(() => {
        setWorkouts(workouts);
      }, 100);
    });
  }, []);

  useEffect(() => {
    if (props.currentWorkout && workouts[currentWorkout]) {
      if (props.currentWorkout.id == workouts[currentWorkout].id) {
        setStartWorkoutMessage(startWorkoutMesssages[1]);
      } else {
        setStartWorkoutMessage(startWorkoutMesssages[2]);
      }
    } else {
      setStartWorkoutMessage(startWorkoutMesssages[0]);
    }
  }, [currentWorkout]);

  const workoutsProgressBar = useSharedValue("0%");
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const exercisesInWorkout = () => {
    let allNames = "";
    if (workouts.length == 0) return allNames;
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
        Your Workouts
      </Text>
      <View style={{ flex: 15, padding: 5 }}>
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
              iconColor={colours.primary}
              iconSize={shoudLoopWorkouts ? 50 : 40}
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
            onPress={() => {
              if (props.currentWorkout) {
                if (props.currentWorkout.id != workouts[currentWorkout].id) {
                  Alert.alert(
                    "Please end your current workout before starting another one"
                  );
                }
              } else {
                props.setCurrentWorkout(workouts[currentWorkout]);
              }
            }}
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
              {startWorkoutMesssage}
            </Text>
          </Button>
        </View>
      </View>
      <View style={{ flex: 80, padding: 5 }}>
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
