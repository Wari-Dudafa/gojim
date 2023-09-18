import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Button from "../../components/Button";
import TypeWriter from "../../components/TypeWriter";

function WelcomePage(props) {
  const theme = useTheme();
  const message = "Welcome to Gojim!";
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
        delay={300}
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
          title="Continue"
          onPress={() => {
            props.navigation.navigate("BulkingOrCuttingPage");
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

export default WelcomePage;
