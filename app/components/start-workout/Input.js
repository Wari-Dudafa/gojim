import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import colours from "../../utils/Colours";

function Input(props) {
  const [number, setNumber] = useState(props.number);

  return (
    <>
      {props.edit ? (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            keyboardType="numeric"
            value={number.toString()}
            onChangeText={setNumber}
            style={{
              fontSize: 20,
              paddingLeft: 30,
              color: colours.text,
              fontFamily: "quicksand",
            }}
          />
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 1,
              color: colours.text,
              fontFamily: "quicksand",
            }}
          >
            {props.afterText ? props.afterText : null}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            fontSize: 20,
            color: colours.text,
            fontFamily: "quicksand",
          }}
        >
          {number}
          {props.afterText ? props.afterText : null}
        </Text>
      )}
    </>
  );
}

export default Input;
