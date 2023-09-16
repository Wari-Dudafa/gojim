import { useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

import Button from "../../components/Button";

function SetCurrentBodySpecsPage(props) {
  const theme = useTheme();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>We just need some info about you</Text>

      <TextInput
        placeholder="Current height (cm)"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        placeholder="Current body weight (kg)"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Current age (years)"
        value={age}
        onChangeText={setAge}
      />

      <Button
        title="Continue"
        onPress={() => {
          props.navigation.navigate("SetMacrosPage");
        }}
      />

      <Button
        title="Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </SafeAreaView>
  );
}

export default SetCurrentBodySpecsPage;
