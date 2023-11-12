import { Text, View } from "react-native";

import colours from "../utils/Colours";

function PlaceholderPage(props) {
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
    </View>
  );
}

export default PlaceholderPage;
