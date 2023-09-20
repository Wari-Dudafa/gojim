import { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Alert,
  View,
  Pressable,
  Keyboard,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../components/Button";
import TypeWriter from "../../components/TypeWriter";

function SetMacrosPage(props) {
  const theme = useTheme();
  const userData = props.route.params.userData;
  const [editing, setEditing] = useState(false);
  const [calories, setCalories] = useState("4000");
  const [protein, setProtein] = useState("200");
  const [carbs, setCarbs] = useState("120");
  const [fats, setfats] = useState("90");
  const message = "We calculated these for you, based on the info you gave";
  const fadingValue = useSharedValue(0);

  useEffect(() => {
    fadeInStart();
    calculateMacros();
  }, []);

  const calculateMacros = () => {
    let maintainanceCalories;
    let calorieIntake;
    let poundsConversionMultiplier = 2.20462;
    let bulkingOrCuttingValue = parseInt(userData.bulkingOrCuttingValue);
    let bulkingOrCuttingValues = [
      null,
      {
        calorieAddition: -800,
        proteinMultiper: 0.8,
        fatsMultiplier: 0.25,
        carbMultiplier: 2.5,
      }, // Heavy cut
      {
        calorieAddition: -500,
        proteinMultiper: 0.8,
        fatsMultiplier: 0.3,
        carbMultiplier: 3,
      }, // Light cut
      {
        calorieAddition: 0,
        proteinMultiper: 0.7,
        fatsMultiplier: 0.4,
        carbMultiplier: 4,
      }, // Maintain
      {
        calorieAddition: 500,
        proteinMultiper: 0.9,
        fatsMultiplier: 0.4,
        carbMultiplier: 5,
      }, // Light bulk
      {
        calorieAddition: 800,
        proteinMultiper: 1.1,
        fatsMultiplier: 0.5,
        carbMultiplier: 7,
      }, // Heavy bulk
    ];
    // For Men, it's 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age)
    // For women, it's 655.1 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age)
    // Source: https://www.omnicalculator.com/health/bmr-harris-benedict-equation

    if (userData.gender == 1 || userData.gender == undefined) {
      // Male
      maintainanceCalories =
        66.5 +
        parseFloat(userData.weight) * 13.75 +
        5.003 * parseFloat(userData.height) -
        6.75 * parseFloat(userData.age);
    } else {
      // Female
      maintainanceCalories =
        655.1 +
        parseFloat(userData.weight) * 9.563 +
        1.85 * parseFloat(userData.height) -
        4.676 * parseFloat(userData.age);
    }
    maintainanceCalories = maintainanceCalories * parseFloat(userData.activity);
    calorieIntake =
      maintainanceCalories +
      bulkingOrCuttingValues[bulkingOrCuttingValue].calorieAddition;

    setCalories(parseInt(calorieIntake));

    let proteinIntake =
      parseFloat(userData.weight) *
      poundsConversionMultiplier *
      bulkingOrCuttingValues[bulkingOrCuttingValue].proteinMultiper;
    setProtein(parseInt(proteinIntake));

    let carbsIntake =
      parseFloat(userData.weight) *
      poundsConversionMultiplier *
      bulkingOrCuttingValues[bulkingOrCuttingValue].carbMultiplier;
    setCarbs(parseInt(carbsIntake));

    let fatsIntake =
      parseFloat(userData.weight) *
      poundsConversionMultiplier *
      bulkingOrCuttingValues[bulkingOrCuttingValue].fatsMultiplier;
    setfats(parseInt(fatsIntake));
  };

  const saveData = async () => {
    // Save the data calculated here
    await AsyncStorage.setItem("firstTimeOpening", "true");

    if (calories < 10) {
      let calories = "10";
      await AsyncStorage.setItem("calories", calories);
    } else {
      await AsyncStorage.setItem("calories", String(calories));
    }

    if (protein < 10) {
      let protein = "10";
      await AsyncStorage.setItem("protein", protein);
    } else {
      await AsyncStorage.setItem("protein", String(protein));
    }

    if (carbs < 10) {
      let carbs = "10";
      await AsyncStorage.setItem("carbs", carbs);
    } else {
      await AsyncStorage.setItem("carbs", String(carbs));
    }

    if (fats < 10) {
      let fats = "10";
      await AsyncStorage.setItem("fats", fats);
    } else {
      await AsyncStorage.setItem("fats", String(fats));
    }
  };

  const fadeInStart = () => {
    let timeout = 3000;
    setTimeout(() => {
      fadingValue.value = withTiming(1, { duration: timeout / 2 });
    }, timeout);
  };

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fadingValue.value,
    };
  });

  const textInputStyle = {
    fontSize: 25,
    textAlign: "center",
    color: theme.colors.onPrimary,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
      }}
    >
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <TypeWriter
          text={message}
          interval={150}
          delay={1500}
          textStyle={{
            fontSize: 40,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            color: theme.colors.onPrimary,
          }}
        />
      </Pressable>

      <Animated.View style={fadeIn}>
        {editing ? (
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={textInputStyle}>Calories: </Text>
              <TextInput
                style={textInputStyle}
                keyboardType="numeric"
                placeholder="Calories"
                value={calories}
                onChangeText={setCalories}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={textInputStyle}>Protein (g): </Text>
              <TextInput
                style={textInputStyle}
                keyboardType="numeric"
                placeholder="Protein"
                value={protein}
                onChangeText={setProtein}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={textInputStyle}>Carbohydrates (g): </Text>
              <TextInput
                style={textInputStyle}
                keyboardType="numeric"
                placeholder="Carbohydrates"
                value={carbs}
                onChangeText={setCarbs}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={textInputStyle}>Fats (g): </Text>
              <TextInput
                style={textInputStyle}
                keyboardType="numeric"
                placeholder="Fats"
                value={fats}
                onChangeText={setfats}
              />
            </View>
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            <Text style={textInputStyle}>Calories: {calories}</Text>
            <Text style={textInputStyle}>Protein (g): {protein}</Text>
            <Text style={textInputStyle}>Carbohydrates (g): {carbs}</Text>
            <Text style={textInputStyle}>Fats (g): {fats}</Text>
          </View>
        )}

        {editing ? (
          <Button
            title="Done"
            onPress={() => {
              if (
                calories.length > 0 &&
                protein.length > 0 &&
                carbs.length > 0 &&
                fats.length > 0
              ) {
                setEditing(false);
              } else {
                Alert.alert("Please do not leave any options blank");
              }
            }}
          />
        ) : (
          <Button
            title="Edit"
            onPress={() => {
              setEditing(true);
            }}
          />
        )}

        {editing ? null : (
          <Button
            title="Accept and complete setup"
            onPress={async () => {
              props.navigation.navigate("TabBarStack");
              saveData();
            }}
          />
        )}

        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            color: theme.colors.onPrimary,
          }}
        >
          Disclaimer: These are only approximations, these values may not be
          entirely accurate, please feel free to edit and change these as you
          wish
        </Text>

        <Button
          title="Back"
          onPress={() => {
            props.navigation.pop();
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

export default SetMacrosPage;
