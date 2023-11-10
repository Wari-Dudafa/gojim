import { Pressable, Text } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { withSpring, useSharedValue } from "react-native-reanimated";

import colours from "../utils/colours";

function Button(props) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const animateScaleTo = 1.1;
  const animateOpacityTo = 0.5;
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const toggleOpacity = (touching) => {
    if (touching) {
      opacity.value = withSpring(animateOpacityTo, springConfig);
      scale.value = withSpring(animateScaleTo, springConfig);
    } else {
      opacity.value = withSpring(1, springConfig);
      scale.value = withSpring(1, springConfig);
    }
  };

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
              ,
              props.textStyle,
              { color: colours.text},
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
