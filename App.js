import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";

import AppStack from "./app/navigation/AppStack";
import LightTheme from "./app/utils/LightTheme";
import DarkTheme from "./app/utils/DarkTheme";
import Database from "./app/classes/DatabaseClass";
import SplashScreen from "./app/utils/SplashScreen";

// Keep the splash screen visible
preventAutoHideAsync();

export default function App() {
  const db = new Database();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(DarkTheme);
  const [firstTimeOpening, setFirstTimeOpening] = useState(true);
  const [splashScreen, setSplashScreen] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    checkFirstTimeOpening();
  }, []);

  useEffect(() => {
    determineColorScheme();
  }, [colorScheme]);

  const checkFirstTimeOpening = async () => {
    try {
      let storedFirstTimeOpening = await AsyncStorage.getItem(
        "firstTimeOpening"
      );
      if (storedFirstTimeOpening === null) {
        // This is the first time the app is being opened
        db.init();
        setFirstTimeOpening(true);
      } else {
        setFirstTimeOpening(false);
      }
    } catch (error) {
      console.error("Error checking first-time opening:", error);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
      hideAsync(); // This causes a momentart flash of white as the app mounts
    }
  };

  const determineColorScheme = () => {
    if (colorScheme === "dark") {
      // render dark mode
      setTheme(DarkTheme);
    } else {
      // render light mode
      setTheme(LightTheme);
    }
  };

  if (!appIsReady) {
    return null;
  }

  if (splashScreen) {
    return (
      <PaperProvider theme={theme}>
        <SplashScreen setSplashScreen={setSplashScreen} />
      </PaperProvider>
    );
  }

  if (firstTimeOpening) {
    return (
      <PaperProvider theme={theme}>
        <AppStack initialRouteName="SetupStack" />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AppStack initialRouteName="TabBarStack" />
    </PaperProvider>
  );
}
