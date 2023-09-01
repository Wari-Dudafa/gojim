import { Text, TouchableOpacity, View } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { useTheme } from "react-native-paper";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

function Button(props) {
  const theme = useTheme();

  const vibrate = () => {
    runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);
  };

  const pan = Gesture.Tap().onBegin(() => {
    runOnJS(vibrate)();
  });

  if (props.visible == false) {
    return null;
  }

  return (
    <TouchableOpacity
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
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <GestureHandlerRootView>
        <GestureDetector gesture={pan} style={{ flex: 1 }}>
          <View>
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
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </TouchableOpacity>
  );
}

export default Button;
