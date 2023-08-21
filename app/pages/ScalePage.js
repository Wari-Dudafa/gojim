import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";
import CornerActionButton from "../components/CornerActionButton";

function ScalePage(props) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Scale" settings navigation={props.navigation} />

      <CornerActionButton
        icon="plus"
        onPress={() => {
          // Add new weight entry
          props.navigation.navigate("WeightEntryPage");
        }}
      />
    </View>
  );
}

export default ScalePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
