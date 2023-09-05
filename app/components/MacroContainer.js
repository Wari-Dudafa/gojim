import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function MacroContainer(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const yPosition = useSharedValue(0);
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      yPosition.value = event.translationY;
    })
    .onFinalize(() => {
      yPosition.value = withSpring(0, springConfig);
    });

  const animatedStyle = useAnimatedStyle(() => {
    let y;
    let maxScrollDistance = screenWidth / 7.5;

    y = interpolate(
      yPosition.value,
      [-screenHeight, 0, screenHeight],
      [-maxScrollDistance, 0, maxScrollDistance],
      "clamp"
    );

    return {
      transform: [{ translateY: y }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedStyle,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              height: screenWidth * 0.85,
              width: screenWidth * 0.85,
              transform: [{ translateY: (screenWidth * 0.85) / 2 }],
              borderRadius: 1000,
              borderWidth: 5,
              borderColor: theme.colors.outline,
            }}
          >
            {props.semiCirlceChildren}
          </View>
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              height: screenHeight,
              width: "95%",
              borderWidth: 5,
              borderColor: theme.colors.outline,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primaryContainer,
                width: screenWidth * 0.85 - 10,
                height: 6,
                alignSelf: "center",
                transform: [{ translateY: -5 }],
              }}
            />
            {props.mainBodyChildren}
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default MacroContainer;
