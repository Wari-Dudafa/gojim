import { useEffect, useState } from "react";
import { Text } from "react-native";

function TypeWriter(props) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    type();
  }, [props.targetTime]);

  const type = () => {
    let index = -1;
    let displayedText = "";
    let text = props.text;
    let waitTimer = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        index++;
        setDisplayedText(displayedText);
        displayedText = displayedText + text[index];
      } else {
        waitTimer++;
        if (waitTimer == props.delay) {
          index = -1;
          waitTimer = 0;
          displayedText = "";
          setDisplayedText("");
        }
      }
    }, props.interval);

    return () => clearInterval(interval);
  };

  return <Text style={props.textStyle}>{displayedText}</Text>;
}

export default TypeWriter;
