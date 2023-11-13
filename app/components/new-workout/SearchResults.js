import { ScrollView, View, Text } from "react-native";

import Button from "../Button";

function SearchResults(props) {
  return (
    <ScrollView>
      {props.searchResults.map((item, index) => {
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
              onPress={() => props.addToExercices(item)}
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
      {props.exerciseName.length >= 2 && props.searchResults.length > 0 ? (
        <View style={{ height: 500, width: "100%" }} />
      ) : null}
    </ScrollView>
  );
}

export default SearchResults;
