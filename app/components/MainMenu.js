import { useState } from "react";
import { View, Pressable, Dimensions } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import Button from "./Button";
import colours from "../utils/Colours";
import MainMenuButtons from "./MainMenuButtons";
import springConfig from "../utils/SpringConfig";

function MainMenu(props) {
  const opacity = useSharedValue(0);
  const blackViewHeight = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const yOffset = useSharedValue(screenHeight * 0.6);

  const toggleMenu = () => {
    if (menuIsOpen) {
      // Close menu
      yOffset.value = withSpring(screenHeight * 0.6, springConfig, () => {
        runOnJS(setMenuIsOpen)(false);
      });
      opacity.value = withTiming(0, null, () => {
        blackViewHeight.value = 0;
      });
    } else {
      // Open menu
      runOnJS(setMenuIsOpen)(true);
      blackViewHeight.value = screenHeight * 5;
      yOffset.value = withSpring(screenHeight * 0.15, springConfig);
      opacity.value = withTiming(0.5);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: "100%",
      }}
    >
      {menuIsOpen ? (
        <>
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
                if (menuIsOpen) {
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
              <MainMenuButtons
                pageNavigation={props.pageNavigation}
                currentPage={props.currentPage}
                pages={props.pages}
                toggleMenu={toggleMenu}
              />
            </View>
          </Animated.View>
        </>
      ) : null}
      <Button
        icon="weight-gram"
        iconColor={colours.primary}
        iconSize={75}
        style={{
          backgroundColor: colours.background,
          borderColor: colours.text,
          borderWidth: 4,
          width: 90,
          height: 90 * 1.35,
          borderRadius: 35,
          shadowColor: "white",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
        onPress={() => {
          toggleMenu();
        }}
      />
    </View>
  );
}

export default MainMenu;
