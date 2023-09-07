import { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import TypeWriter from "@sucho/react-native-typewriter";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import BodyWeightSelector from "../components/BodyWeightSelector";
import RandomNiceMessage from "../utils/RandomNiceMessage";
import Button from "../components/Button";

function WeightEntryPage(props) {
  const theme = useTheme();
  const db = new Database();
  const niceMessge = '"' + RandomNiceMessage() + '"';
  const [bodyWeight, setBodyWeight] = useState("");
  const poundsConversionMultiplier = 2.20462;

  const submitWeight = () => {
    if (bodyWeight.length == 0) {
      Alert.alert("Please type in a number");
    } else {
      // Add bodyweight to the databse
      let date = new Date();
      let statement =
        "INSERT INTO user_weight (date, weight_kg, weight_lbs) VALUES('" +
        date +
        "', " +
        bodyWeight +
        ", " +
        bodyWeight * poundsConversionMultiplier +
        ")";
      db.sql(statement, () => {
        props.navigation.pop();
      });
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="New weight log" back navigation={props.navigation} />

      <View
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
      </View>

      <Button title="Done" onPress={submitWeight} />

      <ScrollView>
        <TypeWriter
          textArray={[niceMessge]}
          loop
          speed={100}
          delay={5000}
          textStyle={{
            color: theme.colors.onBackground,
            fontSize: 30,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          cursorStyle={{
            opacity: 0,
            width: 0,
            height: 0,
            position: "absolute",
          }}
        />
        <View style={{ height: 10 }} />
      </ScrollView>
    </View>
  );
}

export default WeightEntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
