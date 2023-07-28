import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

function Button(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        props.onPress();
      }}
    >
      {props.title ? <Text>{props.title}</Text> : <></>}
      {props.children}
    </TouchableOpacity>
  );
}

export default Button;
