import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useTheme } from "react-native-paper";

import WeightRepSelector from "./WeightRepSelector";
import LastWeightRepSession from "./LastWeightRepSession";
import Database from "../classes/DatabaseClass";

function ExercisePillar(props) {
  const theme = useTheme();
  const db = new Database();
  const [lastWeightRepSession, setLastWeightRepSession] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    grabSessionId();
  }, []);

  const grabSessionId = () => {
    let statement = "SELECT MAX(id) AS max_id FROM session";
    db.sql(statement, (resultSet) => {
      let sessionId = resultSet.rows._array[0].max_id - 1 || null;
      if (sessionId) {
        statement =
          "SELECT rp.rep_count AS reps_in_set, wp.weight_kg AS weight_in_set " +
          "FROM sets s " +
          "JOIN reps_per_set rp ON s.id = rp.sets_id " +
          "JOIN weight_per_set wp ON s.id = wp.sets_id " +
          "WHERE s.session_id = " +
          sessionId +
          " AND s.exercise_id = " +
          props.exercise.id;
        db.sql(statement, (resultSet) => {
          let results = resultSet.rows._array;
          if (results.length == 0) {
            // This is the first time doing this lift
            setDisplay(false);
          } else {
            setLastWeightRepSession(results);
            setDisplay(true);
          }
        });
      }
    });
  };

  const WeightRepSelectorRenderer = () => {
    let setCount = props.exercise.sets;
    let repCount = props.exercise.reps;
    let weightRepSelectorArray = new Array(setCount).fill({});
    return (
      <FlatList
        style={{ flex: 1 }}
        data={weightRepSelectorArray}
        renderItem={({ index }) => {
          return (
            <>
              <WeightRepSelector
                lastWeightRepSession={lastWeightRepSession}
                repCount={repCount}
                exercise={props.exercise}
                key={index}
                index={index}
                newReps={props.newReps}
                setNewReps={props.setNewReps}
                newWeight={props.newWeight}
                setNewWeight={props.setNewWeight}
              />
            </>
          );
        }}
      />
    );
  };

  const LastWeightRepSessionRenderer = () => {
    if (display) {
      return (
        <FlatList
          style={{ flex: 1 }}
          data={lastWeightRepSession}
          renderItem={({ item, index }) => {
            let reps = parseInt(item.reps_in_set);
            let weight = parseFloat(item.weight_in_set);
            return (
              <>
                <LastWeightRepSession reps={reps} weight={weight} key={index} />
              </>
            );
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <View style={[styles.greenPillars, {backgroundColor: theme.colors.primary}]}>
        <Text style={styles.headerText}>Last time</Text>
        <View style={{ alignItems: "center" }}>
          <View style={[styles.underline, {backgroundColor: theme.colors.secondary}]} />
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/shading-1.png")}
          defaultSource={require("../../assets/shading-1.png")}
        />
        <LastWeightRepSessionRenderer />
      </View>

      <View style={[styles.greenPillars, {backgroundColor: theme.colors.primary}]}>
        <Text style={styles.headerText}>Today</Text>
        <View style={{ alignItems: "center" }}>
          <View style={[styles.underline, {backgroundColor: theme.colors.secondary}]} />
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/shading-1.png")}
          defaultSource={require("../../assets/shading-1.png")}
        />
        <WeightRepSelectorRenderer />
      </View>
    </>
  );
}

export default ExercisePillar;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    color: "#e6e6e6",
    fontWeight: 600,
    fontSize: 30,
  },
  underline: {
    borderRadius: 10,
    height: 4,
    width: "90%",
  },
  image: {
    position: "absolute",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
  greenPillars: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    margin: 5,
  },
});
