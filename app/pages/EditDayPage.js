import React from "react";
import { View, Text, StyleSheet } from "react-native";

function EditDayPage({ navigation, route }) {
  let day = route.params.day;
  console.log(day);

  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

export default EditDayPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});