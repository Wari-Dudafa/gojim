import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";

function FoodPage(props) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Food" settings navigation={props.navigation} />
    </View>
  );
}

export default FoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
