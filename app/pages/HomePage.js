import { useState } from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { runOnJS } from "react-native-reanimated";

import colours from "../utils/colours";
import Button from "../components/Button";
import Workout from "../classes/Workout";

function HomePage(props) {
  const [shoudLoopWorkouts, setShoudLoopWorkouts] = useState(true);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const workouts = Workout.getAllWorkouts();

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
        Your workouts:
      </Text>
      <View style={{ height: 100, padding: 5 }}>
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
              iconSize={shoudLoopWorkouts ? 45 : 40}
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
            }}
          >
            <Carousel
              loop
              width={265}
              height={60}
              autoPlay={shoudLoopWorkouts}
              data={workouts}
              scrollAnimationDuration={1000}
              autoPlayInterval={5000}
              onSnapToItem={(index) => {
                runOnJS(setCurrentWorkout)(index);
                console.log("Current index: " + index);
                console.log(workouts[index]);
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    borderColor: colours.accent,
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderRadius: 5,
                    marginHorizontal: 5,
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
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <View style={{ height: 550, padding: 5 }}>
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
            ></View>
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
    </>
  );
}

export default HomePage;
