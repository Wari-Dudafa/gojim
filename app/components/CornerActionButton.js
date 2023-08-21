import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import Button from "./Button";

function CornerActionButton(props) {
  const theme = useTheme();
  return (
    <Button
      onPress={props.onPress}
      style={{
        position: "absolute",
        bottom: 15,
        right: 15,
        backgroundColor: theme.colors.secondary,
        borderRadius: 5,
        padding: 5,
        zIndex: 100,
      }}
    >
      <MaterialCommunityIcons
        name={props.icon}
        size={55}
        color={theme.colors.onSecondary}
      />
    </Button>
  );
}

export default CornerActionButton;
