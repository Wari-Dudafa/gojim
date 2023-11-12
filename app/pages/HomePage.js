import { useEffect, useState } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  withSpring,
  useSharedValue,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import colours from "../utils/Colours";
import Workout from "../backend/Workout";
import Button from "../components/Button";
import springConfig from "../utils/SpringConfig";

function HomePage(props) {
  const autoPlayInterval = 6500;
  const [workouts, setWorkouts] = useState([]);
  const startWorkoutMesssages = ["Start", "🏋🏾🏃🏾"];
  const workoutsProgressBar = useSharedValue("0%");
  const screenWidth = Dimensions.get("window").width;
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const autoPlayIntervalProgressBar = useSharedValue("0%");
  const [shoudLoopWorkouts, setShoudLoopWorkouts] = useState(true);
  const [startWorkoutMesssage, setStartWorkoutMessage] = useState(
    startWorkoutMesssages[0]
  );

  useEffect(() => {
    Workout.getAllWorkouts().then((workouts) => {
      setTimeout(() => {
        setWorkouts(workouts);
      }, 100);
    });

    autoPlayIntervalProgressBar.value = withTiming("100%", {
      duration: autoPlayInterval * 1.05,
    });
  }, []);

  useEffect(() => {
    updateStartWorkoutMessage(currentWorkout);
  }, [props.currentWorkout]);

  const updateStartWorkoutMessage = (index) => {
    if (
      props.currentWorkout &&
      workouts[index] &&
      props.currentWorkout.id == workouts[index].id
    ) {
      setStartWorkoutMessage(startWorkoutMesssages[1]);
    } else {
      setStartWorkoutMessage(startWorkoutMesssages[0]);
    }
  };

  const exercisesInWorkout = () => {
    let allNames = "";

    if (workouts.length == 0) return allNames;
    let workout = workouts[currentWorkout];
    let exercisesInWorkout = workout.getExercises();

    if (!exercisesInWorkout) return allNames;

    for (let index = 0; index < exercisesInWorkout.length; index++) {
      let exercise = exercisesInWorkout[index];

      allNames = allNames + exercise.name;

      if (index != exercisesInWorkout.length - 1) {
        allNames = `${allNames}, `;
      } else {
        allNames = `${allNames}.`;
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
              marginLeft: 2.5,
              backgroundColor: colours.secondary,
              borderRadius: 10,
              flex: 3,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Carousel
              loop
              width={screenWidth}
              autoPlay={shoudLoopWorkouts}
              data={workouts}
              scrollAnimationDuration={1000}
              autoPlayInterval={autoPlayInterval}
              onSnapToItem={(index) => {
                runOnJS(setCurrentWorkout)(index);
                runOnJS(updateStartWorkoutMessage)(index);
                let forwardRatio = 0.8; // What fraction of the total time taken is the line coming forward
                let percentage = parseInt((index / workouts.length) * 100);

                workoutsProgressBar.value = withSpring(
                  percentage + "%",
                  springConfig
                );
                autoPlayIntervalProgressBar.value = withTiming(
                  "1%",
                  {
                    duration: autoPlayInterval * (1 - forwardRatio),
                  },
                  () => {
                    autoPlayIntervalProgressBar.value = withTiming("100%", {
                      duration: autoPlayInterval * forwardRatio,
                    });
                  }
                );
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      textAlign: "center",
                      color: colours.accent,
                      fontFamily: "quicksand",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            />

            <Animated.View
              style={{
                left: "0%",
                height: 2,
                bottom: "7%",
                borderRadius: 10,
                position: "absolute",
                width: workoutsProgressBar,
                backgroundColor: colours.accent,
              }}
            />

            {shoudLoopWorkouts ? (
              <Animated.View
                style={{
                  height: 1,
                  top: "7%",
                  left: "0%",
                  borderRadius: 10,
                  position: "absolute",
                  backgroundColor: colours.accent,
                  width: autoPlayIntervalProgressBar,
                }}
              />
            ) : null}
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
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flex: 1,
              marginRight: 2.5,
            }}
            icon={shoudLoopWorkouts ? "lock-open" : "lock"}
            iconColor={colours.primary}
            iconSize={40}
            onPress={() => {
              setShoudLoopWorkouts(!shoudLoopWorkouts);
            }}
          />
          <Button
            onPress={() => {
              if (workouts.length == 0) {
                Alert.alert("You need to make a workout first");
              } else {
                if (props.currentWorkout) {
                  if (props.currentWorkout.id != workouts[currentWorkout].id) {
                    Alert.alert(
                      "Please end your current workout before starting another one"
                    );
                  }
                } else {
                  props.setCurrentWorkout(workouts[currentWorkout]);
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
              {startWorkoutMesssage}
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
