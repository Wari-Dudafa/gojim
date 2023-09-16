import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";

import Button from "../../components/Button";

function BulkingOrCuttingPage(props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>Are you planning on: </Text>

      <Button
        title="Heavy cut"
        onPress={() => {
          props.navigation.navigate("SetCurrentBodySpecsPage");
        }}
      />
      <Button
        title="Light cut"
        onPress={() => {
          props.navigation.navigate("SetCurrentBodySpecsPage");
        }}
      />
      <Button
        title="Maintain"
        onPress={() => {
          props.navigation.navigate("SetCurrentBodySpecsPage");
        }}
      />
      <Button
        title="Light bulk"
        onPress={() => {
          props.navigation.navigate("SetCurrentBodySpecsPage");
        }}
      />
      <Button
        title="Heavy bulk"
        onPress={() => {
          props.navigation.navigate("SetCurrentBodySpecsPage");
        }}
      />

      <Text>Dont worry, this can be changed later in settings </Text>

      <Button
        title="Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </SafeAreaView>
  );
}

export default BulkingOrCuttingPage;
