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
    // Calculate users macros
  };

  const saveData = () => {
    // Save the data calculated here
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
          delay={1000}
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
              await AsyncStorage.setItem("firstTimeOpening", "true");
              props.navigation.navigate("TabBarStack");
              saveData();
            }}
          />
        )}

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
