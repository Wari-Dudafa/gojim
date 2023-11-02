import { View, Pressable, Dimensions } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Button from "./Button";

function MainMenu(props) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const menuIsOpen = useSharedValue(false);
  const yOffset = useSharedValue(screenHeight * 0.6);
  const opacity = useSharedValue(0);
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const toggleMenu = () => {
    if (menuIsOpen.value) {
      // Close menu
      console.log("Menu closing");
      yOffset.value = withSpring(screenHeight * 0.6, springConfig);
      opacity.value = withTiming(0);
      menuIsOpen.value = false;
    } else {
      // Open menu
      console.log("Menu opening");
      yOffset.value = withSpring(screenHeight * 0.2, springConfig);
      opacity.value = withTiming(0.5);
      menuIsOpen.value = true;
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: "5%",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "black",
          width: screenWidth * 6,
          height: screenHeight * 6,
          opacity: opacity,
        }}
      >
        <Pressable
          style={{
            flex: 1,
          }}
          onPress={() => {
            if (menuIsOpen.value) {
              toggleMenu();
            }
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "blue",
          width: screenWidth,
          height: screenHeight * 0.8,
          borderRadius: 30,
          transform: [{ translateY: yOffset }],
        }}
      >
        <View
          style={{
            margin: 30,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {props.children}
        </View>
      </Animated.View>
      <Button
        style={{
          backgroundColor: "red",
          width: 80,
          height: 80,
          borderRadius: 30,
        }}
        onPress={() => {
          toggleMenu();
        }}
      />
    </View>
  );
}

export default MainMenu;
