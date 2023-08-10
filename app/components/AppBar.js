import React from "react";
import { Appbar } from "react-native-paper";
import { useTheme } from "react-native-paper";

function AppBar(props) {
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.elevation.level5,
      }}
    >
      {props.back ? (
        <Appbar.BackAction
          onPress={() => {
            props.navigation.pop();
          }}
        />
      ) : null}
      {props.title ? <Appbar.Content title={props.title} /> : null}
      {props.settings ? (
        <Appbar.Action
          icon="cog"
          onPress={() => {
            props.navigation.navigate("SettingsPage");
          }}
        />
      ) : null}
    </Appbar.Header>
  );
}

export default AppBar;
