import { View, Text } from "react-native";

import colours from "../../utils/Colours";

function Set(props) {
  const reps = Math.floor(Math.random() * 12) + 1;
  const weight = Math.floor(Math.random() * 100) + 1;
  const lastReps = Math.floor(Math.random() * 12) + 1;
  const lastWeight = Math.floor(Math.random() * 100) + 1;

  return (
    <View
      style={{
        padding: 2,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: colours.accent,
      }}
    >
      <View
        style={{
          padding: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: colours.primary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {props.setNumber}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {weight}kg
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {reps} reps
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {weight * reps}J
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 15,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: colours.secondary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colours.text,
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {props.setNumber}
          </Text>
          <Text
            style={{
              color: colours.text,
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {lastWeight}kg
          </Text>
          <Text
            style={{
              color: colours.text,
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {lastReps} reps
          </Text>
          <Text
            style={{
              color: colours.text,
              fontFamily: "quicksand",
              fontSize: 20,
            }}
          >
            {lastWeight * lastReps}J
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Set;
