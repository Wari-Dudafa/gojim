import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";

function Macro(props) {
  const theme = useTheme();
  const db = new Database();
  const [percentage, setPercentage] = useState("0%");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let statement = "";
    let newPercentage = Math.floor(Math.random() * 101) + "%";
    setPercentage(newPercentage);
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
        alignItems: "center",
        flexDirection: "row",
        borderColor: theme.colors.outline,
      }}
    >
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />

      <Text style={{ flex: 0.5, color: theme.colors.onPrimary }}>
        {props.type}
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.tertiary,
          borderRadius: 10,
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/shading-1.png")}
          defaultSource={require("../../assets/shading-1.png")}
        />
        <View
          style={{
            backgroundColor: theme.colors.secondary,
            flex: 1,
            width: percentage,
            borderRadius: 10,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: theme.colors.onSecondary }}>{percentage}</Text>
        </View>
      </View>
    </View>
  );
}

export default Macro;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
});
