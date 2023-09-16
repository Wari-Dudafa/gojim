import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../components/Button";

function SetMacrosPage(props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>
        We have calculated these macros for you, would you like to change or
        accept?
      </Text>

      <Button title="Change" onPress={() => {}} />

      <Button
        title="Accept and complete setup"
        onPress={async () => {
          await AsyncStorage.setItem("firstTimeOpening", "true");
          props.navigation.navigate("TabBarStack");
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </SafeAreaView>
  );
}

export default SetMacrosPage;
