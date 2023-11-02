import { useState, useCallback } from "react";
import { View, StatusBar, SafeAreaView, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { runOnJS } from "react-native-reanimated";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MainMenu from "./app/components/MainMenu";
import colours from "./app/utils/colours";
import Button from "./app/components/Button";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [shoudLoopWorkouts, setShoudLoopWorkouts] = useState(true);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [fontsLoaded, fontError] = useFonts({
    quicksand: require("./assets/fonts/quicksand/Quicksand-Regular.ttf"),
    "quicksand-bold": require("./assets/fonts/quicksand/Quicksand-Bold.ttf"),
    "quicksand-light": require("./assets/fonts/quicksand/Quicksand-Light.ttf"),
    "quicksand-medium": require("./assets/fonts/quicksand/Quicksand-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colours.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar />

      <View style={{ flex: 10 }}>
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
                  console.log(currentWorkout);
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
                data={[
                  { name: "Chest day" },
                  { name: "Leg day" },
                  { name: "Cardio" },
                  { name: "Back day" },
                  { name: "Arm day" },
                ]}
                scrollAnimationDuration={1000}
                autoPlayInterval={5000}
                onSnapToItem={(index) => {
                  runOnJS(setCurrentWorkout)(index);
                  console.log("current index:", index);
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
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <MainMenu />
      </View>
    </SafeAreaView>
  );
}
