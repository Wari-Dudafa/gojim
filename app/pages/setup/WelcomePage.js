import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";

import Button from "../../components/Button";

function WelcomePage(props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>Welcome to Gojim</Text>

      <Button
        title="Continue"
        onPress={() => {
          props.navigation.navigate("BulkingOrCuttingPage");
        }}
      />
    </SafeAreaView>
  );
}

export default WelcomePage;
