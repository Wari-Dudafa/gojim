import { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import AppBar from "../components/AppBar";
import CornerActionButton from "../components/CornerActionButton";
import MacroContainer from "../components/MacroContainer";

function FoodPage(props) {
  const theme = useTheme();

  useEffect(() => {
    // Get data
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Get data
    }, [])
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Food" settings navigation={props.navigation} />

      <CornerActionButton
        icon="plus"
        onPress={() => {
          // Add new food entry
        }}
      />

      <MacroContainer />
    </View>
  );
}

export default FoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
