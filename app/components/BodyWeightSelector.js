import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  PanResponder,
  Animated,
  TextInput,
  Keyboard,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";

function BodyWeightSelector(props) {
  const theme = useTheme();
  const weightAddOn = 10;
  const setBodyWeight = props.setBodyWeight;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      let bodyWeight = props.bodyWeight;
      if (bodyWeight.length == 0) {
        bodyWeight = weightAddOn;
      }
      let positon = gestureState.moveX;
      let addingFraction = positon / screenWidth;
      let equationVariables = [1.5, 0.5];
      // Quadtaric equation that lets me map input to rate of change of weight
      let rateOfChangeOfWeightChange =
        equationVariables[0] *
        (addingFraction - equationVariables[1]) *
        (addingFraction - equationVariables[1]);

      if (gestureState.vx > 0) {
        velocity = 1;
      } else {
        velocity = -1;
      }

      let newWeight =
        parseFloat(bodyWeight) +
        weightAddOn * rateOfChangeOfWeightChange * velocity;

      newWeight = String(newWeight.toFixed(1));

      if (newWeight > 0) {
        setBodyWeight(newWeight);
      }
    },
  });

  return (
    <Animated.View {...panResponder.panHandlers}>
      <Pressable
        style={{
          width: screenWidth * 0.9,
          height: screenHeight / 2,
          borderRadius: 10,
          alignItems: "center",
          borderWidth: 10,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.outline,
        }}
        onPress={() => {
          Keyboard.dismiss();
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
      </Pressable>
    </Animated.View>
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
