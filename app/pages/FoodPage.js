import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function FoodPage(props) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <></>
    </View>
  );
}

export default FoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
