import { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Alert,
  Pressable,
  Keyboard,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";

import Button from "../../components/Button";
import TypeWriter from "../../components/TypeWriter";

function SetCurrentBodySpecsPage(props) {
  const theme = useTheme();
  const bulkingOrCuttingValue = props.route.params.value;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const message = "Just need some information about you";
  const fadingValue = useSharedValue(0);
  const widthValue = useSharedValue(screenWidth * 1.1);
  const heightValue = useSharedValue(screenHeight * 1.1);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    fadeInStart();
    movementAnimation();
  }, []);

  const fadeInStart = () => {
    let timeout = 1500;
    setTimeout(() => {
      fadingValue.value = withTiming(1, { duration: timeout / 2 });
    }, timeout);
  };

  const movementAnimation = () => {
    let duration = 10000;

    imageOpacity.value = withTiming(0.05, { duration: 2000 });

    widthValue.value = withRepeat(
      withTiming(3.5 * screenWidth, {
        duration: duration,
      }),
      0,
      true
    );
    heightValue.value = withRepeat(
      withTiming(2 * screenHeight, {
        duration: duration,
      }),
      0,
      true
    );
  };

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fadingValue.value,
    };
  });

  const textInputStyle = {
    fontSize: 30,
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
      <Animated.Image
        style={{
          position: "absolute",
          width: widthValue,
          height: heightValue,
          resizeMode: "stretch",
          opacity: imageOpacity,
          zIndex: -1,
        }}
        source={require("../../../assets/shading-1.png")}
        defaultSource={require("../../../assets/shading-1.png")}
        blurRadius={5}
      />

      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <TypeWriter
          text={message}
          interval={200}
          delay={3000}
          textStyle={{
            fontSize: 40,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            color: theme.colors.onPrimary,
          }}
        />

        <Animated.View style={fadeIn}>
          <TextInput
            style={textInputStyle}
            placeholder="Current height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={textInputStyle}
            placeholder="Current body weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={textInputStyle}
            placeholder="Current age (years)"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value={1} />
            <Picker.Item label="Female" value={2} />
            <Picker.Item label="Rather not say" value={3} />
          </Picker>

          <Button
            title="Continue"
            onPress={() => {
              if (height.length > 0 && weight.length > 0 && age.length > 0) {
                if (parseInt(age) < 18) {
                  Alert.alert(
                    "As you are not an adult, the results may be innacurate"
                  );
                }
                props.navigation.navigate("ExerciseFrequncyPage", {
                  userData: {
                    bulkingOrCuttingValue: bulkingOrCuttingValue,
                    height: height,
                    weight: weight,
                    age: age,
                    gender: gender,
                  },
                });
              } else {
                Alert.alert("Please fill in the form");
              }
            }}
          />

          <Button
            title="Back"
            onPress={() => {
              props.navigation.pop();
            }}
          />
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

export default SetCurrentBodySpecsPage;
