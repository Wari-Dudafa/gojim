import { Text, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

function Button(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        props.onPress();
      }}
    >
      {props.title ? <Text>{props.title}</Text> : <></>}
      {props.children}
    </TouchableOpacity>
  );
}

export default Button;
