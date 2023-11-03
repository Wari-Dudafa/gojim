import { useCallback, useState } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MainMenu from "./app/components/MainMenu";
import colours from "./app/utils/colours";
import HomePage from "./app/pages/HomePage";
import FoodPage from "./app/pages/FoodPage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentPage, setCurrentPage] = useState("homePage");
  const [fontsLoaded, fontError] = useFonts({
    quicksand: require("./assets/fonts/quicksand/Quicksand-Regular.ttf"),
    "quicksand-bold": require("./assets/fonts/quicksand/Quicksand-Bold.ttf"),
    "quicksand-light": require("./assets/fonts/quicksand/Quicksand-Light.ttf"),
    "quicksand-medium": require("./assets/fonts/quicksand/Quicksand-Medium.ttf"),
  });
  const pages = {
    homePage: { component: <HomePage />, icon: "home", name: "homePage" },
    addPage: {
      name: "addPage",
      icon: "plus",
      component: <FoodPage text="addPage" />,
    },
    graphPage: {
      name: "graphPage",
      icon: "chart-line",
      component: <FoodPage text="graphPage" />,
    },
    foodPage: {
      name: "foodPage",
      icon: "bowl-mix",
      component: <FoodPage text="foodPage" />,
    },
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const pageNavigation = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colours.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar />

      <View style={{ flex: 10 }}>{pages[currentPage].component}</View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <MainMenu
          pageNavigation={pageNavigation}
          currentPage={currentPage}
          pages={pages}
        />
      </View>
    </SafeAreaView>
  );
}
