import { useEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import AppBar from "../components/AppBar";
import MacroContainer from "../components/MacroContainer";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function FoodPage(props) {
  const theme = useTheme();
  const db = new Database();
  const [data, setData] = useState();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let statement =
      "SELECT * FROM meals WHERE day = " +
      day +
      " AND " +
      "month = " +
      month +
      " AND " +
      "year = " +
      year;

    db.sql(statement, (resultSet) => {
      let results = resultSet.rows._array;
      setData(results);
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar title="Food" settings navigation={props.navigation} />

      <MacroContainer data={data} />

      <Button
        title="Add meal"
        onPress={() => {
          // Add new food entry
          props.navigation.navigate("AddFoodPage");
        }}
      />
    </View>
  );
}

export default FoodPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
