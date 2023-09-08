import { useState } from "react";
import { View, TextInput, Pressable, Keyboard, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function AddFoodPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setfats] = useState("");

  const onSubmit = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const validateMacro = (macro) => {
      if (macro.length == 0) {
        return "0";
      } else {
        return macro;
      }
    };

    statement =
      "INSERT INTO meals (day, month, year, calories, protein, carbs, fats, date) VALUES(" +
      day +
      ", " +
      month +
      ", " +
      year +
      ", " +
      validateMacro(calories) +
      ", " +
      validateMacro(protein) +
      ", " +
      validateMacro(carbs) +
      ", " +
      validateMacro(fats) +
      ", '" +
      date +
      "')";

    db.sql(statement, (resultSet) => {
      props.navigation.pop();
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <AppBar navigation={props.navigation} back title="Add meal" />

      <Pressable
        style={{
          flex: 1,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={[styles.textInput, { color: theme.colors.onBackground }]}
            placeholder="Calories"
            value={calories}
            keyboardType="numeric"
            onChangeText={setCalories}
          />

          <TextInput
            style={[styles.textInput, { color: theme.colors.onBackground }]}
            placeholder="Protein (g)"
            value={protein}
            keyboardType="numeric"
            onChangeText={setProtein}
          />

          <TextInput
            style={[styles.textInput, { color: theme.colors.onBackground }]}
            placeholder="Carobydrates (g)"
            value={carbs}
            keyboardType="numeric"
            onChangeText={setCarbs}
          />

          <TextInput
            style={[styles.textInput, { color: theme.colors.onBackground }]}
            placeholder="Fats (g)"
            value={fats}
            keyboardType="numeric"
            onChangeText={setfats}
          />
        </View>
        <Button title="Submit" onPress={onSubmit} />
      </Pressable>
    </View>
  );
}

export default AddFoodPage;

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    fontSize: 30,
  },
});
