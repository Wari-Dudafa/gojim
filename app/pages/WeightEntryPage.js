import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";

function WeightEntryPage(props) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="New weight log" back navigation={props.navigation} />
    </View>
  );
}

export default WeightEntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
