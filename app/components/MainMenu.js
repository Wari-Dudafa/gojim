import { View, Pressable, Dimensions } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Button from "./Button";
import colours from "../utils/colours";

function MainMenu(props) {
  const menuItemsYOffset = 30;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const blackViewHeight = useSharedValue(0);
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
      yOffset.value = withSpring(screenHeight * 0.6, springConfig);
      opacity.value = withTiming(0, null, () => {
        blackViewHeight.value = 0;
      });
    } else {
      // Open menu
      blackViewHeight.value = screenHeight * 5;
      yOffset.value = withSpring(screenHeight * 0.15, springConfig);
      opacity.value = withTiming(0.5);
    }
    menuIsOpen.value = !menuIsOpen.value;
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
          width: screenWidth * 5,
          height: blackViewHeight,
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
        ></Pressable>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: colours.secondary,
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
          <Button
            icon="plus"
            style={{
              height: 80,
              width: 80,
              borderRadius: 30,
              backgroundColor: colours.primary,
              transform: [{ translateY: menuItemsYOffset }],
            }}
          />

          <Button
            icon="chart-line"
            style={{
              height: 80,
              width: 80,
              borderRadius: 30,
              backgroundColor: colours.primary,
            }}
          />

          <Button
            icon="bowl-mix"
            style={{
              height: 80,
              width: 80,
              borderRadius: 30,
              backgroundColor: colours.primary,
              transform: [{ translateY: menuItemsYOffset }],
            }}
          />
        </View>
      </Animated.View>
      <Button
        icon="weight-gram"
        iconColor={colours.primary}
        iconSize={70}
        style={{
          backgroundColor: colours.background,
          borderColor: colours.text,
          borderWidth: 5,
          width: 90,
          height: 120,
          borderRadius: 999,
          shadowColor: "white",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 3,
        }}
        onPress={() => {
          toggleMenu();
        }}
      />
    </View>
  );
}

export default MainMenu;
