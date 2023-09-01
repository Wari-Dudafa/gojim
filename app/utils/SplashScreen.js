import { useEffect } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  runOnJS,
} from "react-native-reanimated";

function SplashScreen(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const verticalOffset = useSharedValue(-screenHeight);
  const scale = useSharedValue(0.1);

  useEffect(() => {
    introAnimation();
  }, []);

  const introAnimation = () => {
    runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);
    verticalOffset.value = withSequence(
      withSpring(0, null, () => {
        runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);
        verticalOffset.value = withSequence(
          withSpring(screenHeight, null, () => {
            runOnJS(props.setSplashScreen)(false);
          })
        );
      })
    );
    scale.value = withSequence(withSpring(1));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: screenWidth * 0.8,
      height: screenWidth * 0.8,
      transform: [{ translateY: verticalOffset.value }, { scale: scale.value }],
    };
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        style={animatedStyle}
        source={require("../../assets/icon-transparent.png")}
        defaultSource={require("../../assets/icon-transparent.png")}
      />
    </View>
  );
}

export default SplashScreen;
