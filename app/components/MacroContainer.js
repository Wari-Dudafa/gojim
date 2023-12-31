import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Macro from "./Macro";
import CalorieCounter from "./CalorieCounter";
import Button from "./Button";

function MacroContainer(props) {
  const theme = useTheme();
  const [calorieData, setCalorieData] = useState();
  const [proteinData, setProteinData] = useState();
  const [carbsData, setcCarbsData] = useState();
  const [fatsData, setFatsData] = useState();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [screenHeightDivision, setScreenHeightDivision] = useState(10);

  useEffect(() => {
    parseData();
    calculateScale();
  }, [props.data]);

  const parseData = () => {
    // Handle data
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    if (props.data != undefined) {
      for (let index = 0; index < props.data.length; index++) {
        const macros = props.data[index];
        calories = calories + parseInt(macros.calories);
        protein = protein + parseInt(macros.protein);
        carbs = carbs + parseInt(macros.carbs);
        fats = fats + parseInt(macros.fats);
      }
    }

    setCalorieData(calories);
    setProteinData(protein);
    setcCarbsData(carbs);
    setFatsData(fats);
  };

  const calculateScale = () => {
    if (screenHeight > 750) {
      if (screenHeight > 900) {
        setScreenHeightDivision(90);
      } else {
        setScreenHeightDivision(40);
      }
    } else {
      if (screenHeight < 700) {
        setScreenHeightDivision(7);
      } else {
        setScreenHeightDivision(10);
      }
    }
  };

  const yPosition = useSharedValue(0);
  const springConfig = {
    mass: 0.5,
    damping: 50,
  };

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      yPosition.value = event.translationY;
    })
    .onFinalize(() => {
      yPosition.value = withSpring(0, springConfig);
    });

  const animatedStyle = useAnimatedStyle(() => {
    let y;
    let maxScrollDistance = screenWidth / 7.5;

    y = interpolate(
      yPosition.value,
      [-screenHeight, 0, screenHeight],
      [-maxScrollDistance, 0, maxScrollDistance],
      "clamp"
    );

    return {
      transform: [{ translateY: y - screenHeight / screenHeightDivision }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedStyle,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              height: screenWidth * 0.85,
              width: screenWidth * 0.85,
              transform: [{ translateY: (screenWidth * 0.85) / 2 }],
              borderRadius: 1000,
              borderWidth: 5,
              borderColor: theme.colors.outline,
            }}
          >
            <CalorieCounter data={calorieData} />
          </View>
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              height: screenHeight,
              width: "95%",
              borderWidth: 5,
              borderColor: theme.colors.outline,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primaryContainer,
                width: screenWidth * 0.85 - 10,
                height: 6,
                alignSelf: "center",
                transform: [{ translateY: -5 }],
              }}
            />

            <Macro
              title="Protein (g)"
              databaseAlias="protein"
              data={proteinData}
            />
            <Macro
              title="Carbohydrates (g)"
              databaseAlias="carbs"
              data={carbsData}
            />
            <Macro title="Fats (g)" databaseAlias="fats" data={fatsData} />
            <Button
              title="Add meal"
              onPress={() => {
                // Add new food entry
                props.navigation.navigate("AddFoodPage");
              }}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default MacroContainer;
