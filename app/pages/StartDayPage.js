import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";
import ExerciseWithButton from "../components/ExerciseWithButton";
import AppBar from "../components/AppBar";

function StartDayPage(props) {
  const theme = useTheme();
  const day = props.route.params.day;
  const [exercises, setExercises] = useState([]);
  const db = new Database();

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = () => {
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar navigation={props.navigation} back title={day.name} />
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></View>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <ExerciseWithButton
            exercise={item}
            navigate
            index={index}
            lastIndex={exercises.length - 1}
            buttonIcon="play-outline"
            navigation={props.navigation}
            navigationDestination="StartExercisePage"
            key={index}
          />
        )}
      />
    </View>
  );
}

export default StartDayPage;
