import { View, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import Button from "./Button";

function DayPageButtons(props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Button
        style={[
          styles.bottomButtons,
          {
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,
            backgroundColor: theme.colors.secondary,
          },
        ]}
        onPress={() => {
          props.navigation.navigate("ExerciseGraphPage", {
            day: props.day,
          });
        }}
      >
        <MaterialCommunityIcons
          name="chart-line"
          size={40}
          color={theme.colors.onSecondary}
        />
      </Button>

      <Button
        style={[
          styles.bottomButtons,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={() => {
          Alert.alert(
            "Confirmation",
            "Are you ready to start your session?",
            [
              { text: "No", style: "cancel" },
              {
                text: "Yes",
                onPress: () => {
                  props.navigation.navigate("StartDayPage", {
                    day: props.day,
                  });
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <MaterialCommunityIcons
          name="play"
          size={40}
          color={theme.colors.onSecondary}
        />
      </Button>

      <Button
        style={[
          styles.bottomButtons,
          {
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            backgroundColor: theme.colors.secondary,
          },
        ]}
        onPress={() => {
          props.onPress();
          props.navigation.navigate("EditDayPage", { day: props.day });
        }}
      >
        <MaterialCommunityIcons
          name="pencil"
          size={40}
          color={theme.colors.onSecondary}
        />
      </Button>
    </View>
  );
}

export default DayPageButtons;

const styles = StyleSheet.create({
  bottomButtons: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 5,
    position: "absolute",
    top: "75%",
  },
});
