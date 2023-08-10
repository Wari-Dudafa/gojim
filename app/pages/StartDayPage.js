import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useTheme } from "react-native-paper";

import Button from "../components/Button";
import Database from "../classes/DatabaseClass";
import ExerciseStarter from "../components/ExerciseStarter";
import AppBar from "../components/AppBar";

function StartDayPage(props) {
  const theme = useTheme();
  const day = props.route.params.day;
  const [exercises, setExercises] = useState([]);
  const db = new Database();

  useEffect(() => {
    // Grab exercises
    let statement = "SELECT * FROM exercises WHERE day_id = " + day.id;
    db.sql(statement, (resultSet) => {
      setExercises(resultSet.rows._array);
      // Make a new session
      let date = new Date();
      let statement =
        "INSERT INTO session (date, day_id) VALUES('" +
        date +
        "', " +
        day.id +
        ")";
      db.sql(statement, () => {});
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar navigation={props.navigation} back={true} />
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.colors.onBackground,
            fontWeight: 800,
            textAlign: "center",
            fontSize: 40,
          }}
        >
          {day.name}
        </Text>
        <Button
          title="End workout"
          onPress={() => {
            props.navigation.pop();
          }}
        />
      </View>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <ExerciseStarter
            exercise={item}
            navigation={props.navigation}
            key={index}
          />
        )}
      />
    </View>
  );
}

export default StartDayPage;
