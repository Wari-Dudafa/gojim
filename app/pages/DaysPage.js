import { View, Button } from "react-native";

import SwipingCards from "../../SwipingCards";

function DaysPage({ navigation, props }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <SwipingCards />
      <Button
        title="Add new day"
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
      ></Button>
    </View>
  );
}

export default DaysPage;
