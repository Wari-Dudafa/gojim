import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";

function ScalePage(props) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Scale" settings={true} navigation={props.navigation} />
      <></>
    </View>
  );
}

export default ScalePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
