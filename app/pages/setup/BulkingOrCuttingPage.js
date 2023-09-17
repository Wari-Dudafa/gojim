import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Button from "../../components/Button";
import TypeWriter from "../../components/TypeWriter";

function BulkingOrCuttingPage(props) {
  const theme = useTheme();
  const message = "What are your weight plans?";
  const fadingValue = useSharedValue(0);

  useEffect(() => {
    fadeInStart();
  }, []);

  const fadeInStart = () => {
    let timeout = 2000;
    setTimeout(() => {
      fadingValue.value = withTiming(1, { duration: timeout / 2 });
    }, timeout);
  };

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fadingValue.value,
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
      }}
    >
      <TypeWriter
        text={message}
        interval={200}
        delay={140}
        textStyle={{
          fontSize: 40,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
          color: theme.colors.onPrimary,
        }}
      />

      <Animated.View style={fadeIn}>
        <Button
          title="Heavy cut"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 1,
            });
          }}
        />
        <Button
          title="Light cut"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 2,
            });
          }}
        />
        <Button
          title="Maintain"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 3,
            });
          }}
        />
        <Button
          title="Light bulk"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 4,
            });
          }}
        />
        <Button
          title="Heavy bulk"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 5,
            });
          }}
        />

        <Text style={{ textAlign: "center", color: theme.colors.onPrimary }}>
          Dont worry, this can be changed later in settings{" "}
        </Text>

        <Button
          title="Back"
          onPress={() => {
            props.navigation.pop();
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

export default BulkingOrCuttingPage;
