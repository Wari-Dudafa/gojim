import { Text, View } from "react-native";

import colours from "../utils/colours";

function FoodPage(props) {
  return (
    <View>
      <Text style={{ color: colours.text }}>{props.text}</Text>
    </View>
  );
}

export default FoodPage;
