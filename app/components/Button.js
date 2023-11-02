import { Pressable } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Button(props) {
  return (
    <Pressable
      style={[
        props.style,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      onPressIn={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        if (props.onPressIn) {
          props.onPressIn();
        }
      }}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Medium);
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      {props.icon ? (
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name={props.icon}
          size={props.iconSize ? props.iconSize : 50}
          color={props.iconColor}
        />
      ) : null}
      {props.children ? props.children : null}
    </Pressable>
  );
}

export default Button;
