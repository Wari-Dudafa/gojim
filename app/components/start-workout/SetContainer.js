import { View, Text } from "react-native";

import colours from "../../utils/Colours";

function SetContainer(props) {
  return (
    <View>
      <Text
        style={{
          color: colours.text,
        }}
      >
        {props.exercise.name}
      </Text>
    </View>
  );
}

export default SetContainer;
