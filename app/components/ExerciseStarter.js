import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "./Button";

function ExerciseStarter(props) {
  const [unPressed, setUnPressed] = useState(true);

  return (
    <View shouldRasterizeIOS={true} style={styles.container}>
      <View style={styles.exerciseContainer}>
        <View>
          <Text style={styles.name}>{props.exercise.name}</Text>
          <Text style={styles.reps}>{props.exercise.reps} reps</Text>
          <Text style={styles.sets}>{props.exercise.sets} sets </Text>
        </View>
        {unPressed ? (
          <>
            <Button
              onPress={() => {
                props.navigation.navigate("StartExercisePage", {
                  exercise: props.exercise,
                });
                // So the logo switch doesnt happen instantly
                setTimeout(() => {
                  setUnPressed(false);
                }, 1000);
              }}
              style={styles.playButton}
            >
              <Feather name="play" size={55} color="#e6e6e6" />
            </Button>
          </>
        ) : (
          <>
            <Button style={styles.progressChevrons}>
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Feather
                  name="chevron-down"
                  size={70}
                  color="#c24451"
                  // color="#4490c2"
                  style={{ padding: 0, margin: 0 }}
                />
                <Feather
                  name="chevron-down"
                  size={70}
                  color="#c24451"
                  // color="#4490c2"
                  style={{
                    position: "absolute",
                    padding: 0,
                    margin: 0,
                    top: 20,
                  }}
                />
              </View>
            </Button>
          </>
        )}
        <Image
          style={styles.image}
          source={require("../../assets/shading-1.png")}
          defaultSource={require("../../assets/shading-1.png")}
        />
      </View>
    </View>
  );
}

export default ExerciseStarter;

const styles = StyleSheet.create({
  name: {
    color: "#e6e6e6",
    fontWeight: 800,
    fontSize: 40,
  },
  reps: {
    color: "#e6e6e6",
    fontSize: 20,
  },
  sets: {
    color: "#e6e6e6",
    fontSize: 20,
  },
  exerciseContainer: {
    flex: 1,
    backgroundColor: "#93c244",
    borderColor: "#2e476b",
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 2,
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
