import { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";

import Button from "../Button";
import colours from "../../utils/Colours";

function StartExercise(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <View
        style={{
          padding: 10,
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          text={props.exercise.name}
          textStyle={{ fontFamily: "quicksand-medium", fontSize: 20 }}
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
        renderChildrenCollapsed
        collapsed={isCollapsed}
        style={{
          padding: 10,
          backgroundColor: colours.secondary,
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              color: colours.text,
            }}
          >
            {props.exercise.name}
          </Text>
        </View>
      </Collapsible>
    </>
  );
}

export default StartExercise;
