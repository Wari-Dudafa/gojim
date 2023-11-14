import { ScrollView, View, Text, Dimensions } from "react-native";

import Button from "../Button";
import colours from "../../utils/Colours";

function SearchResults(props) {
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      style={{
        borderBottomWidth: props.searchResults.length > 0 ? 5 : 0,
        borderColor: colours.accent,
        maxHeight: screenHeight * 0.5,
      }}
    >
      {props.searchResults.map((item, index) => {
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
      {props.searchResults.length > 0 ? (
        // Render a buffer
        <View
          style={{
            height: 50,
          }}
        />
      ) : null}
    </ScrollView>
  );
}

export default SearchResults;
