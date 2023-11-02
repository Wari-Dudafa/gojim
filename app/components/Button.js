import { Pressable } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

function Button(props) {
  return (
    <Pressable
      style={props.style}
      onPressIn={() => {
        impactAsync(ImpactFeedbackStyle.Light);
      }}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Medium);
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      {props.children}
    </Pressable>
  );
}

export default Button;
