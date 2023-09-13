import { useState } from "react";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

function FoodAmountSelector(props) {
  const [amount, setAmount] = useState();

  const finishedTyping = () => {
    let tempFoodAmount = [...props.foodAmount];
    tempFoodAmount[props.index] = parseFloat(amount);
    props.setFoodAmount(tempFoodAmount);
  };

  return (
    <View>
      <Text>{props.food.name}</Text>
      <TextInput
        style={{
          color: "white",
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
