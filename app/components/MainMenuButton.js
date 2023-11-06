import Button from "./Button";
import colours from "../utils/colours";

function MainMenuButton(props) {
  let yOffset = 35;

  return (
    <Button
      icon={props.page.icon}
      style={{
        height: 80,
        width: 80,
        borderRadius: 30,
        backgroundColor: colours.primary,
        transform: [{ translateY: props.offset ? yOffset : 0 }],
      }}
      onPress={() => {
        props.pageNavigation(props.page.name);
        props.toggleMenu();
      }}
    />
  );
}

export default MainMenuButton;
