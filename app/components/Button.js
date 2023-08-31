import { useEffect, useState } from "react";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [hapticSetting, setHapticSetting] = useState(true);

  useEffect(() => {
    getButtonHapticSetting();
  }, []);

  const vibrate = () => {
    if (hapticSetting) {
      runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);
    }
  };

  const pan = Gesture.Tap().onBegin(() => {
    runOnJS(vibrate)();
  });

  const getButtonHapticSetting = async () => {
    try {
      const value = await AsyncStorage.getItem("hapticSetting");
      if (value == "true") {
        // Setting is true so set the setting to true
        setHapticSetting(true);
        if (props.setHapticSetting) {
          props.setHapticSetting(true);
        }
      } else if (value == "false") {
        // Setting is false so set the setting to false
        setHapticSetting(false);
        if (props.setHapticSetting) {
          props.setHapticSetting(false);
        }
      }
    } catch (error) {
      Alert.alert("An error occured, please try again later");
      console.error(error);
    }
  };

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
