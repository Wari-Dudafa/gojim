import { useCallback, useState } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Database from "./app/backend/Database";
import MainMenu from "./app/components/MainMenu";
import colours from "./app/utils/colours";
import StartWorkout from "./app/components/StartWorkout";
import HomePage from "./app/pages/HomePage";
import NewWorkout from "./app/pages/NewWorkout";
import PlaceholderPage from "./app/pages/PlaceholderPage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentPage, setCurrentPage] = useState("homePage");
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [fontsLoaded, fontError] = useFonts({
    quicksand: require("./assets/fonts/quicksand/Quicksand-Regular.ttf"),
    "quicksand-bold": require("./assets/fonts/quicksand/Quicksand-Bold.ttf"),
    "quicksand-light": require("./assets/fonts/quicksand/Quicksand-Light.ttf"),
    "quicksand-medium": require("./assets/fonts/quicksand/Quicksand-Medium.ttf"),
  });

  const pages = {
    homePage: {
      name: "homePage",
      icon: "home",
      component: (
        <HomePage
          currentWorkout={currentWorkout}
          setCurrentWorkout={setCurrentWorkout}
        />
      ),
    },
    NewWorkout: {
      name: "NewWorkout",
      icon: "plus",
      component: <NewWorkout header="New Workout" />,
    },
    graphPage: {
      name: "graphPage",
      icon: "chart-line",
      component: <PlaceholderPage header="Graphs" />,
    },
    foodPage: {
      name: "foodPage",
      icon: "bowl-mix",
      component: <PlaceholderPage header="Food Tracking" />,
    },
  };

  const pageNavigation = (pageName) => {
    setCurrentPage(pageName);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      Database.init();
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

      <View style={{ flex: 12 }}>{pages[currentPage].component}</View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <StartWorkout
          currentWorkout={currentWorkout}
          setCurrentWorkout={setCurrentWorkout}
        />
        <MainMenu
          pageNavigation={pageNavigation}
          currentPage={currentPage}
          pages={pages}
        />
      </View>
    </SafeAreaView>
  );
}
