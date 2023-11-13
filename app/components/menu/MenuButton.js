import Button from "../Button";
import colours from "../../utils/Colours";

function MenuButton(props) {
  const yOffset = 35;
  const iconSize = 55;
  const smallerIcons = ["plus"];
  const smallerIconSize = iconSize * 1.2;

  return (
    <Button
      icon={props.page.icon}
      iconSize={
        smallerIcons.includes(props.page.icon) ? smallerIconSize : iconSize
      }
      style={{
        width: 80,
        margin: -5,
        height: 80,
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: colours.primary,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        transform: [{ translateY: props.offset ? yOffset : 0 }],
      }}
      onPress={() => {
        props.pageNavigation(props.page.name);
        props.toggleMenu();
      }}
    />
  );
}

export default MenuButton;
