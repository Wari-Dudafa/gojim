import { View } from "react-native";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";

function AddFoodPage(props) {
  const theme = useTheme();
  const db = new Database();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <AppBar navigation={props.navigation} back />
    </View>
  );
}

export default AddFoodPage;
