import { Text, View } from "react-native";

import MainMenu from "./app/components/MainMenu";
import Button from "./app/components/Button";

export default function App() {
  const yOffset = 30;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
        <Text>Gojim 2.0</Text>
      </View>

      <View
        style={{
          width: 360,
          height: 400,
          backgroundColor: "pink",
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            backgroundColor: "white",
            borderRadius: 30,
            bottom: "-10%",
          }}
        ></View>
      </View>

      <MainMenu>
        <Button
          style={{
            height: 80,
            width: 80,
            borderRadius: 30,
            backgroundColor: "green",
            transform: [{ translateY: yOffset }],
          }}
        />
        <Button
          style={{
            height: 80,
            width: 80,
            borderRadius: 30,
            backgroundColor: "purple",
          }}
        />
        <Button
          style={{
            height: 80,
            width: 80,
            borderRadius: 30,
            backgroundColor: "orange",
            transform: [{ translateY: yOffset }],
          }}
        />
      </MainMenu>
    </View>
  );
}
