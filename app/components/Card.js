import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function Card(props) {
  return (
    <View style={props.style}>
      <Image
        style={styles.image}
        source={require("../../assets/shading.png")}
      />

      <View style={styles.border}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.underline} />
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
  text: {
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
});

// scaleY and scaleX don't take an anonymous function for whatever reason but if you ever need it- here is the code

() => {
  // Either 1 or -1
  var randomNumber = Math.random();
  var result = randomNumber < 0.5 ? 1 : -1;
  return result;
};
