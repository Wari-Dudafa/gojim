import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";

import AppStack from "./app/navigation/AppStack";
import LightTheme from "./app/utils/LightTheme";
import DarkTheme from "./app/utils/DarkTheme";

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(() => {
    if (colorScheme === "dark") {
      // render dark mode
      setTheme(DarkTheme);
    } else {
      // render light mode
      setTheme(LightTheme);
    }
  }, [colorScheme]);
  return (
    <PaperProvider theme={theme}>
      <AppStack />
    </PaperProvider>
  );
}
