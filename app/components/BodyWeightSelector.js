import { View, Dimensions, Image, StyleSheet, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

function BodyWeightSelector(props) {
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        width: windowWidth * 0.9,
        height: windowHeight / 2,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 10,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.outline,
      }}
    >
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />
      <View
        style={{
          width: "60%",
          height: "25%",
          backgroundColor: theme.colors.secondary,
          borderRadius: 10,
          borderWidth: 5,
          borderColor: theme.colors.onSecondary,
          marginTop: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: theme.colors.onSecondary,
            textAlign: "center",
            fontSize: 60,
          }}
          placeholder="Weight"
          keyboardType="numeric"
          value={props.bodyWeight}
          onChangeText={props.setBodyWeight}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          // Left
          style={[styles.footprint, { transform: [{ scaleX: -1 }] }]}
          source={require("../../assets/footprint.png")}
          defaultSource={require("../../assets/footprint.png")}
        />
        <Image
          // Right
          style={styles.footprint}
          source={require("../../assets/footprint.png")}
          defaultSource={require("../../assets/footprint.png")}
        />
      </View>
    </View>
  );
}

export default BodyWeightSelector;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    opacity: 0.05,
    zIndex: -1,
  },
  footprint: {
    opacity: 0.5,
    tintColor: "black",
    height: "95%",
    width: "50%",
    resizeMode: "contain",
  },
});
