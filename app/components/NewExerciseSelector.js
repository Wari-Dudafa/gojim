import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function NewExerciseSelector(props) {
  // For each exercise in the array, an exercise selector component is rendered

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.scroll}>
        {props.exercises.map((item, index) => {
          RenderRightActions = (progress) => {
            RenderRightAction = (text, color, x, progress, onPress) => {
              const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
              });

              return (
                <Animated.View
                  style={{
                    flex: 1,
                    transform: [{ translateX: 0 }],
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={onPress}
                  >
                    <Text style={styles.rightActionText}>{text}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            };

            return (
              <View style={{ width: 192, flexDirection: "row-reverse" }}>
                {RenderRightAction("Delete", "red", 128, progress, Delete)}
                {RenderRightAction("Edit", "blue", 192, progress, Edit)}
              </View>
            );
          };

          const Edit = () => {
            // Edit excercise object
            Alert.alert("Edited");
          };

          const Delete = () => {
            // Delete excercise object from array
            // Set updated array ad main array
            Alert.alert("Deleted");
            Close();
          };

          UpdateRef = (ref) => {
            swipeableRow = ref;
          };

          Close = () => {
            swipeableRow.close();
          };

          return (
            <Swipeable
              ref={UpdateRef}
              friction={2}
              rightThreshold={50}
              renderRightActions={RenderRightActions}
            >
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
            </Swipeable>
          );
        })}
      </ScrollView>
    </GestureHandlerRootView>
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
  },
  rightAction: {
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  rightActionText: {
    color: "#e6e6e6",
    fontSize: 20,
    padding: 10,
  },
});
