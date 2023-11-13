import { ScrollView, View, Text } from "react-native";

import Button from "../Button";

function Exercises(props) {
  return (
    <ScrollView>
      {props.exercises.map((item, index) => {
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
              onPress={() => props.deleteExercise(index)}
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
  );
}

export default Exercises;
