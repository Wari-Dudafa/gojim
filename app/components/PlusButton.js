import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";

function PlusButton(props) {
  // 3d button image texture
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.altText}>+</Text>
    </TouchableOpacity>
  );
}

export default PlusButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
  },
  altText: {
    color: "#e6e6e6",
    fontSize: 20,
  },
  image: {},
});
