import { useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import BodyWeightSelector from "../components/BodyWeightSelector";
import Button from "../components/Button";

function WeightEntryPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [bodyWeight, setBodyWeight] = useState("");

  const submitWeight = () => {
    if (bodyWeight.length == 0) {
      Alert.alert("Please type in a number");
    } else {
      // Add bodyweight to the databse
      props.navigation.pop();
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="New weight log" back navigation={props.navigation} />
      <SafeAreaView
        style={{
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BodyWeightSelector
          bodyWeight={bodyWeight}
          setBodyWeight={setBodyWeight}
        />
      </SafeAreaView>
      <Button title="Done" onPress={submitWeight} />
    </View>
  );
}

export default WeightEntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
