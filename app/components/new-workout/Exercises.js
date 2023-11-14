import { ScrollView, View, Text, Dimensions } from "react-native";

import Button from "../Button";
import colours from "../../utils/Colours";

function Exercises(props) {
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      style={{
        maxHeight: screenHeight * 0.6,
      }}
    >
      {props.exercises.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              padding: 5,
              width: "100%",
              flexDirection: "row",
              position: "relative",
              borderColor: colours.accent,
              justifyContent: "space-between",
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
      <View style={{ height: 50 }} /> 
    </ScrollView>
  );
}

export default Exercises;
