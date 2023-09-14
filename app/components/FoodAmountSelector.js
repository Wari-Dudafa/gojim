import { useState } from "react";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

function FoodAmountSelector(props) {
  const theme = useTheme();
  const [amount, setAmount] = useState();

  const finishedTyping = () => {
    let tempFoodAmount = [...props.foodAmount];
    tempFoodAmount[props.index] = parseFloat(amount);
    props.setFoodAmount(tempFoodAmount);
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 20,
        margin: 10,
      }}
    >
      <Text
        style={{
          color: theme.colors.onPrimary,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {props.food.name}
      </Text>
      <TextInput
        style={{
          color: theme.colors.onPrimary,
          padding: 10,
          textAlign: "center",
          fontSize: 20,
        }}
        placeholder="Amount (g)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        onEndEditing={finishedTyping}
      />
    </View>
  );
}

export default FoodAmountSelector;
