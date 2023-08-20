import { useEffect } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { useTheme } from "react-native-paper";

import CardWidgets from "./CardWidgets";

function Card(props) {
  const theme = useTheme();
  const fadeInValue = new Animated.Value(0);
  const widgetFadeInValue = new Animated.Value(0);
  const cardOpacity = fadeInValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const widgetOpacity = widgetFadeInValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    determineAnimation();
  }, []);

  const determineAnimation = () => {
    if (props.fade) {
      fadeIn();
    } else {
      stayIn();
    }
    if (props.widgets) {
      fadeInWidgets();
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeInWidgets = () => {
    Animated.timing(widgetFadeInValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const stayIn = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      shouldRasterizeIOS
    >
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")} // Blinking, acceptable performance
        defaultSource={require("../../assets/shading-1.png")} // No blinking, terrible performance
      />

      <View style={[styles.border, { borderColor: theme.colors.outline }]}>
        <Animated.Text
          style={[
            styles.name,
            { opacity: cardOpacity, color: theme.colors.onPrimary },
          ]}
        >
          {props.dayName}
        </Animated.Text>
        <View
          style={[styles.underline, { backgroundColor: theme.colors.outline }]}
        />
        {props.widgets ? (
          <Animated.View style={{ opacity: widgetOpacity, flex: 1 }}>
            <CardWidgets dayId={props.dayId} />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 280,
    height: "100%",
    resizeMode: "stretch",
    opacity: 0.05,
    zIndex: -1,
  },
  border: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 5,
    alignContent: "center",
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
  mainCard: {
    position: "absolute",
    top: 70,
    height: 450,
    width: 280,
    borderRadius: 10,
    zIndex: 1,
  },
  itemContainer: {
    flex: 1,
    paddingBottom: 10,
  },
});
