import { useState } from "react";
import { View, TextInput, Text, ScrollView } from "react-native";

import Button from "../components/Button";
import colours from "../utils/Colours";
import Workout from "../backend/Workout";
import exerciseNames from "../utils/ExerciseNames";

function NewWorkout(props) {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [noSearchResults, setNoSearchResults] = useState(false);

  const saveWorkout = () => {
    if (name.length == 0) {
      Alert.alert("Please type a workout name");
    } else {
      let newWorkout = new Workout(name);

      for (let index = 0; index < exercises.length; index++) {
        let exercise = exercises[index];

        newWorkout.addExercise(exercise.name, false);
      }

      setName("");
      setSearchResults([]);
      setExerciseName("");
      setExercises([]);
      Alert.alert("New workout created!");
    }
  };
  const handleExerciseNameChange = (text) => {
    let filteredExerciseNames = exerciseNames.filter((item) =>
      item.includes(text)
    );
    setExerciseName(text);
    if (text.length >= 2) {
      setSearchResults(filteredExerciseNames);
    } else {
      setSearchResults([]);
    }
    setNoSearchResults(filteredExerciseNames.length == 0);
  };

  const addToExercices = (name) => {
    let tempExercises = [...exercises];
    tempExercises.push({ name: name, timed: false });
    setExerciseName("");
    setSearchResults([]);
    setExercises(tempExercises);
  };

  const deleteExercise = (index) => {
    let tempExercises = [...exercises];
    tempExercises.splice(index, 1);
    setExercises(tempExercises);
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "quicksand-bold",
          color: colours.text,
          fontSize: 40,
          padding: 10,
        }}
      >
        {props.header}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          placeholder="Workout name"
          value={name}
          onChangeText={setName}
          style={{ padding: 10, fontSize: 30, color: colours.text }}
        />

        <Button
          icon={"content-save"}
          iconColor={colours.primary}
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            saveWorkout(0);
          }}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          backgroundColor: colours.secondary,
        }}
      >
        <View
          style={{
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 10,
            backgroundColor: colours.secondary,
            shadowOffset: { width: 0, height: -1 },
            zIndex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Exercise name"
              value={exerciseName}
              onChangeText={(text) => handleExerciseNameChange(text)}
              style={{
                padding: 10,
                fontSize: 30,
                color: colours.text,
                flex: 3,
              }}
            />
            {noSearchResults ? (
              <Button
                icon={"plus"}
                style={{ paddingHorizontal: 10, flex: 1 }}
                iconColor={colours.primary}
                onPress={() => {
                  addToExercices(exerciseName);
                }}
              />
            ) : null}
          </View>
        </View>
        <ScrollView>
          {searchResults.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: colours.secondary,
                  borderColor: colours.accent,
                  position: "relative",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    flex: 3,
                    padding: 10,
                    fontSize: 25,
                    color: colours.text,
                  }}
                >
                  {item}
                </Text>
                <Button
                  icon={"plus"}
                  style={{ paddingHorizontal: 10, flex: 1 }}
                  iconColor={colours.primary}
                  onPress={() => {
                    addToExercices(item);
                  }}
                />
                <View
                  style={{
                    height: 2,
                    left: "4%",
                    bottom: "0%",
                    width: "90%",
                    borderRadius: 10,
                    position: "absolute",
                    backgroundColor: colours.accent,
                  }}
                />
              </View>
            );
          })}
          {exerciseName.length >= 2 && searchResults.length > 0 ? (
            <View style={{ height: 500, width: "100%" }} />
          ) : null}
        </ScrollView>

        <ScrollView>
          {exercises.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: colours.secondary,
                  borderColor: colours.accent,
                  position: "relative",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    flex: 3,
                    padding: 10,
                    fontSize: 25,
                    color: colours.text,
                  }}
                >
                  {item.name}
                </Text>
                <Button
                  icon={"delete"}
                  style={{ paddingHorizontal: 10, flex: 1 }}
                  iconColor={colours.primary}
                  onPress={() => {
                    deleteExercise(index);
                  }}
                />
                <View
                  style={{
                    height: 2,
                    left: "4%",
                    bottom: "0%",
                    width: "90%",
                    borderRadius: 10,
                    position: "absolute",
                    backgroundColor: colours.accent,
                  }}
                />
              </View>
            );
          })}
          <View style={{ height: 100, width: "100%" }} />
        </ScrollView>
      </View>
    </View>
  );
}

export default NewWorkout;
