import { View, TextInput } from "react-native";

import Button from "../Button";
import colours from "../../utils/Colours";
import SearchResults from "./SearchResults";
import Exercises from "./Exercises";

function ExerciseList(props) {
  return (
    <View
      style={{
        marginTop: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colours.secondary,
      }}
    >
      <View
        style={{
          zIndex: 1,
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 10,
          backgroundColor: colours.secondary,
          shadowOffset: { width: 0, height: -1 },
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Exercise name"
            value={props.exerciseName}
            onChangeText={(text) => props.handleExerciseNameChange(text)}
            style={{
              flex: 3,
              padding: 10,
              fontSize: 30,
              color: colours.text,
            }}
          />
          {props.noSearchResults ? (
            <Button
              icon={"plus"}
              style={{ paddingHorizontal: 10, flex: 1 }}
              iconColor={colours.primary}
              onPress={() => props.addToExercices(props.exerciseName)}
            />
          ) : null}
        </View>
      </View>

      <SearchResults
        exerciseName={props.exerciseName}
        searchResults={props.searchResults}
        addToExercices={props.addToExercices}
      />
      <Exercises
        exercises={props.exercises}
        deleteExercise={props.deleteExercise}
      />
    </View>
  );
}

export default ExerciseList;
