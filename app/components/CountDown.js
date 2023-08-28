import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

function CountDown(props) {
  const theme = useTheme();
  const [timeDifference, setTimeDiffernce] = useState("00:00:00");
  const [keepTicking, setKeepTicking] = useState(true);

  useEffect(() => {
    tick();
  }, [props.targetTime]);

  const tick = () => {
    if (keepTicking && props.targetTime != "__$$__") {
      const interval = setInterval(() => {
        let targetTime = new Date(props.targetTime);
        let currentTime = new Date();
        let diffTime = Math.abs(targetTime - currentTime);

        let hours = parseInt(diffTime / (3.6 * 1000000));
        let minutes = parseInt((diffTime / 60000) % 60);
        let seconds = parseInt((diffTime / 1000) % 60);

        let countdown = hours + ":" + minutes + ":" + seconds;

        if (seconds == 0) {
          if (minutes == 0) {
            if (hours == 0) {
              props.timerRanOut(true);
              setKeepTicking(false);
            } else {
              setTimeDiffernce(countdown);
            }
          } else {
            setTimeDiffernce(countdown);
          }
        } else {
          setTimeDiffernce(countdown);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  };

  return (
    <View style={{ paddingTop: 10, marginBottom: -10 }}>
      <Text
        style={{
          color: theme.colors.onBackground,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {props.prefixText}
        {timeDifference}
      </Text>
    </View>
  );
}

export default CountDown;
