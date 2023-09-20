import { Text, Pressable } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { useTheme } from "react-native-paper";
import Animated, { withSpring, useSharedValue } from "react-native-reanimated";

function Button(props) {
  const theme = useTheme();
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const toggleOpacity = (touching) => {
    if (touching) {
      opacity.value = withSpring(0.4, springConfig);
      scale.value = withSpring(1.15, springConfig);
    } else {
      opacity.value = withSpring(1, springConfig);
      scale.value = withSpring(1, springConfig);
    }
  };

  if (props.invisible) {
    return null;
  }

  return (
    <Pressable
      style={
        props.style
          ? props.style
          : {
              backgroundColor: theme.colors.secondary,
              padding: 10,
              margin: 5,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }
      }
      onPressIn={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        toggleOpacity(true);
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
        style={{ opacity: opacity, transform: [{ scale: scale }] }}
      >
        {props.title ? (
          <Text
            style={
              props.titleStyle
                ? props.titleStyle
                : { textAlign: "center", color: theme.colors.onSecondary }
            }
          >
            {props.title}
          </Text>
        ) : null}
        {props.children}
      </Animated.View>
    </Pressable>
  );
}

export default Button;
