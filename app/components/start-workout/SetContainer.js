import { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";

import colours from "../../utils/Colours";
import Button from "../Button";
import Set from "./Set";

function SetContainer(props) {
  const buttonHeightWidth = 80;
  const screenHeight = Dimensions.get("window").height;
  const [numberOfSets, setNumberOfSets] = useState([null, null]);

  const deleteSet = (indexToRemove) => {
    let tempNumberOfSets = [...numberOfSets];
    tempNumberOfSets.splice(indexToRemove, 1);
    setNumberOfSets(tempNumberOfSets);
  };

  return (
    <>
      <ScrollView
        style={{
          height: screenHeight * 0.5,
        }}
      >
        {numberOfSets.map((item, index) => (
          <Set
            key={index}
            index={index}
            deleteSet={deleteSet}
            setNumber={index + 1}
          />
        ))}
        <View style={{ height: buttonHeightWidth }} />
      </ScrollView>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Button
          icon={"plus"}
          style={{
            padding: 5,
            bottom: "200%",
            borderRadius: 50,
            position: "absolute",
            width: buttonHeightWidth,
            height: buttonHeightWidth,
            backgroundColor: colours.accent,
          }}
          onPress={() => {
            setNumberOfSets([...numberOfSets, null]);
          }}
        />
      </View>
    </>
  );
}

export default SetContainer;
