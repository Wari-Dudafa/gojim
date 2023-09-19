import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Macro(props) {
  const theme = useTheme();
  const [percentage, setPercentage] = useState("0%");
  const [maximum, setMaximum] = useState(0);

  useEffect(() => {
    getMaximum();
  }, [props.data]);

  const getMaximum = async () => {
    try {
      const value = await AsyncStorage.getItem(props.databaseAlias);

      if (value === null) {
        setMaximum(100);
      } else {
        setMaximum(parseInt(value));
      }

      if (props.data >= parseInt(value)) {
        setPercentage("100%");
      } else {
        setPercentage(parseInt((props.data / parseInt(value)) * 100) + "%");
      }
    } catch (error) {
      console.error(error);
      setMaximum(100);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 10,
        height: 70,
        borderRadius: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: theme.colors.outline,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ color: theme.colors.onPrimary }}>{props.title}</Text>
        <Text style={{ color: theme.colors.onSecondary }}>{percentage}</Text>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.tertiary,
          borderRadius: 10,
          width: "100%",
          height: "20%",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.secondary,
            width: percentage,
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />
    </View>
  );
}

export default Macro;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "110%",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
});
