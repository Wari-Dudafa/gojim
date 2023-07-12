import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

function NewExerciseSelector(props) {
  // For each exercise in the array, an exercise selector component is rendered

  return (
    <ScrollView style={styles.scroll}>
      {props.exercises.map((item, index) => {
        return (
          <View style={styles.container} key={index}>
            <View key={index} style={styles.exerciseContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.reps}>{item.reps} reps</Text>
              <Text style={styles.sets}>{item.sets} sets </Text>
              <Image
                style={styles.image}
                source={require("../../assets/shading.png")}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default NewExerciseSelector;

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
  },
  image: {
    position: "absolute",
    resizeMode: "stretch",
    opacity: 0.05,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    zIndex: -1,
  },
  container: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  scroll: {
    flex: 1,
    paddingBottom: 20,
  }
});
