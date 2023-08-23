import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

function SetupStack(props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      onLayout={props.onLayout}
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Button
        title="Complete setup"
        onPress={async () => {
          await AsyncStorage.setItem("firstTimeOpening", "true");
          props.navigation.navigate("TabBarStack");
        }}
      />
    </SafeAreaView>
  );
}

export default SetupStack;
