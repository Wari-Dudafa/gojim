import { useEffect, useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useTheme } from "react-native-paper";

function Button(props) {
  const theme = useTheme();
  const [hapticSetting, setHapticSetting] = useState(true);

  useEffect(() => {
    getButtonHapticSetting();
  }, []);

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
    return <></>;
  }

  return (
    <TouchableOpacity
      style={
        props.style
          ? props.style
          : {
              backgroundColor: theme.colors.secondary,
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }
      }
      onPress={() => {
        if (hapticSetting) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        if (props.onPress) {
          props.onPress();
        }
      }}
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
      ) : (
        <></>
      )}
      {props.children}
    </TouchableOpacity>
  );
}

export default Button;
