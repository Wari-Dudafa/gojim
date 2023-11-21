import { useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";

import Button from "../Button";
import SetContainer from "./SetContainer";
import colours from "../../utils/Colours";

function StartExercise(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <View
        style={[
          {
            padding: 10,
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colours.accent,
            borderBottomWidth: 1,
          },
          isCollapsed
            ? null
            : {
                zIndex: 1,
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 7,
                backgroundColor: colours.background,
                shadowOffset: { width: 0, height: 15 },
              },
        ]}
      >
        <Button
          text={props.exercise.name}
          textStyle={{ fontFamily: "quicksand-medium", fontSize: 22 }}
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
        <Button
          iconColor={colours.text}
          icon={isCollapsed ? "chevron-left" : "chevron-down"}
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
      </View>
      <Collapsible
        collapsed={isCollapsed}
        style={{
          padding: 10,
          width: "100%",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: colours.secondary,
        }}
      >
        <SetContainer exercise={props.exercise} />
      </Collapsible>
    </>
  );
}

export default StartExercise;
