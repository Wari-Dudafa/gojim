import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import Button from "./Button";

function ExerciseWithButton(props) {
  const theme = useTheme();
  const [unPressed, setUnPressed] = useState(true);

  const BottomPadding = () => {
    if (props.index == props.lastIndex) {
      return <View style={{ height: 70 }} />;
    }
  };

  return (
    <>
      <View shouldRasterizeIOS style={styles.container}>
        <View
          style={[
            styles.exerciseContainer,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <View>
            <Text style={[styles.name, { color: theme.colors.onPrimary }]}>
              {props.exercise.name}
            </Text>
            {props.showRepsSets ? (
              <>
                <Text style={[styles.reps, { color: theme.colors.onPrimary }]}>
                  {props.exercise.reps} reps
                </Text>
                <Text style={[styles.sets, { color: theme.colors.onPrimary }]}>
                  {props.exercise.sets} sets
                </Text>
              </>
            ) : null}
          </View>
          {unPressed ? (
            <Button
              onPress={() => {
                if (props.navigate) {
                  props.navigation.navigate(props.navigationDestination, {
                    exercise: props.exercise,
                  });
                  // So the logo switch doesnt happen instantly
                  setTimeout(() => {
                    setUnPressed(false);
                  }, 1000);
                }
                if (props.onPress) {
                  props.onPress();
                }
              }}
              style={styles.playButton}
            >
              <MaterialCommunityIcons
                name={props.buttonIcon}
                size={55}
                color={theme.colors.onPrimary}
              />
            </Button>
          ) : null}
          <Image
            style={styles.image}
            source={require("../../assets/shading-1.png")}
            defaultSource={require("../../assets/shading-1.png")}
          />
        </View>
      </View>
      <BottomPadding />
    </>
  );
}

export default ExerciseWithButton;

const styles = StyleSheet.create({
  name: {
    fontWeight: 800,
    fontSize: 40,
  },
  reps: {
    fontSize: 20,
  },
  sets: {
    fontSize: 20,
  },
  exerciseContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 5,
    padding: 10,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    position: "absolute",
    transform: [{ translateY: -100 }],
    resizeMode: "stretch",
    opacity: 0.05,
    zIndex: -1,
  },
  container: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  playButton: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  progressChevrons: {
    borderRadius: 5,
    justifyContent: "center",
  },
});
