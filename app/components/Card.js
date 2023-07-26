import { useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

function Card(props) {
  const fadeInValue = new Animated.Value(0);
  const cardOpacity = fadeInValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fadeIn = () => {
    Animated.timing(fadeInValue, {
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

  useEffect(() => {
    if (props.fade) {
      fadeIn();
    } else {
      stayIn();
    }
  }, []);

  return (
    <View style={styles.mainCard}>
      <Image
        style={styles.image}
        source={require("../../assets/shading.png")}
      />

      <View style={styles.border}>
        <Animated.Text style={[styles.name, { opacity: cardOpacity }]}>
          {props.name}
        </Animated.Text>
        <View style={styles.underline} />

        <Animated.View style={{ opacity: cardOpacity }}>
          {/* This is where the widgets will be */}
        </Animated.View>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 280,
    height: 450,
    resizeMode: "stretch",
    opacity: 0.05,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    zIndex: -1,
  },
  border: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    alignContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 900,
    color: "#e6e6e6",
  },
  underline: {
    width: "90%",
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: "#e6e6e6",
  },
  mainCard: {
    position: "absolute",
    top: 70,
    backgroundColor: "#93c244",
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
