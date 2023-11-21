import { Pressable, Text } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { withSpring, useSharedValue } from "react-native-reanimated";

import colours from "../utils/Colours";
import springConfig from "../utils/SpringConfig";

function Button(props) {
  const animateScaleTo = 1.1;
  const animateOpacityTo = 0.5;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const toggleOpacity = (touching) => {
    if (touching) {
      scale.value = withSpring(animateScaleTo, springConfig);
      opacity.value = withSpring(animateOpacityTo, springConfig);
    } else {
      scale.value = withSpring(1, springConfig);
      opacity.value = withSpring(1, springConfig);
    }
  };

  return (
    <Pressable
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
      onPressIn={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        toggleOpacity(true);
        if (props.onPressIn) {
          props.onPressIn();
        }
      }}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Medium);
        toggleOpacity(false);
        if (props.onPress) {
          props.onPress();
        }
      }}
      onPressOut={() => {
        toggleOpacity(false);
        if (props.onPressOut) {
          props.onPressOut();
        }
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: opacity,
          transform: [{ scale: scale }],
        }}
      >
        {props.icon ? (
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name={props.icon}
            size={props.iconSize ? props.iconSize : 50}
            color={props.iconColor ? props.iconColor : colours.background}
          />
        ) : null}
        {props.children}

        {props.text ? (
          <Text
            style={[
              { color: colours.text, fontFamily: "quicksand-medium" },
              props.textStyle,
            ]}
          >
            {props.text}
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

export default Button;
