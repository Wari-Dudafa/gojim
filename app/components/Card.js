import { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import CardWidgets from "./CardWidgets";

function Card(props) {
  const theme = useTheme();
  const fadingValue = useSharedValue(0);

  useEffect(() => {
    fadeInWidget();
  }, []);

  const fadeInWidget = () => {
    if (props.widgets) {
      let timeout = 750;
      setTimeout(() => {
        fadingValue.value = withTiming(1, { duration: timeout / 2 });
      }, timeout);
    }
  };

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fadingValue.value,
    };
  });

  return (
    <Animated.View
      style={[styles.card, props.style, { borderColor: theme.colors.outline }]}
    >
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />

      <Text style={[styles.name, { color: props.textColor }]}>
        {props.day ? props.day.name : null}
      </Text>
      <View
        style={[styles.underline, { backgroundColor: theme.colors.outline }]}
      />
      <Animated.View style={[fadeIn, { flex: 1 }]}>
        {props.widgets ? (
          <CardWidgets dayId={props.day ? props.day.id : null} />
        ) : null}
      </Animated.View>
    </Animated.View>
  );
}

export default Card;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    opacity: 0.05,
    zIndex: -1,
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 900,
  },
  underline: {
    width: "90%",
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 5,
  },
});
