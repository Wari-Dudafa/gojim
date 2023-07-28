import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "./Button";

function ExerciseStarter(props) {
  return (
    <View shouldRasterizeIOS={true} style={styles.container}>
      <View style={styles.exerciseContainer}>
        <View>
          <Text style={styles.name}>{props.exercise.name}</Text>
          <Text style={styles.reps}>{props.exercise.reps} reps</Text>
          <Text style={styles.sets}>{props.exercise.sets} sets </Text>
        </View>
        <Button
          style={styles.playButton}
          onPress={() =>
            props.navigation.navigate("StartExercisePage", { exercise: props.exercise })
          }
        >
          <Feather
            name="play-circle"
            size={70}
            color="#4490c2"
            style={{ justifyContent: "center", alignSelf: "center" }}
          />
        </Button>
        <Image
          style={styles.image}
          source={require("../../assets/shading.png")}
          defaultSource={require("../../assets/shading.png")}
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
    justifyContent: "center",
  },
});
