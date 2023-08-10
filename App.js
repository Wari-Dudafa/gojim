import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Appearance, useColorScheme } from "react-native";

import AppStack from "./app/navigation/AppStack";
import LightTheme from "./app/utils/LightTheme";
import DarkTheme from "./app/utils/DarkTheme";

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(() => {
    console.log(colorScheme);
    if (colorScheme === "dark") {
      // render some dark thing
      setTheme(DarkTheme);
    } else {
      // render some light thing
      setTheme(LightTheme);
    }
  }, [colorScheme]);
  return (
    <PaperProvider theme={theme}>
      <AppStack />
    </PaperProvider>
  );
}
