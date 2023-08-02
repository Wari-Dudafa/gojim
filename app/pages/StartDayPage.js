import { useEffect, useState } from "react";
import { View, FlatList, Alert, Text } from "react-native";

import Button from "../components/Button";
import Database from "../classes/DatabaseClass";
import ExerciseStarter from "../components/ExerciseStarter";

function StartDayPage(props) {
  const day = props.route.params.day;
  const [exercises, setExercises] = useState([]);
  const db = new Database();

  useEffect(() => {
    let statement = "SELECT * FROM exercises WHERE day_id = " + day.id;
    db.sql(statement, (resultSet) => {
      setExercises(resultSet.rows._array);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#e6e6e6",
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
