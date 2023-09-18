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

function ExerciseFrequncyPage(props) {
  const theme = useTheme();
  const userData = props.route.params.userData;
  const message = "How active are you?";
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
        delay={500}
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
          title="Sedentary: little to no exercise with a desk job"
          onPress={() => {
            userData.activity = 1.2;
            props.navigation.navigate("SetMacrosPage", {
              userData: userData,
            });
          }}
        />
        <Button
          title="Lightly active: light exercise 1 to 3 times per week "
          onPress={() => {
            userData.activity = 1.375;
            props.navigation.navigate("SetMacrosPage", {
              userData: userData,
            });
          }}
        />
        <Button
          title="Moderately active: moderate exercise 3 to 5 times per week"
          onPress={() => {
            userData.activity = 1.55;
            props.navigation.navigate("SetMacrosPage", {
              userData: userData,
            });
          }}
        />
        <Button
          title="Very active: hard exercise 6 to 7 times per week"
          onPress={() => {
            userData.activity = 1.725;
            props.navigation.navigate("SetMacrosPage", {
              userData: userData,
            });
          }}
        />
        <Button
          title="Extremely active: hard daily exercise and a physical job"
          onPress={() => {
            userData.activity = 1.9;
            props.navigation.navigate("SetMacrosPage", {
              userData: userData,
            });
          }}
        />

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

export default ExerciseFrequncyPage;
