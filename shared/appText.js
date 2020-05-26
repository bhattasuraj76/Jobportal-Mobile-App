import React, { useContext } from "react";
import { Text } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function AppText({ title, size, family, weight, style, color, css }) {
  //get theme color
  const { isThemeDark } = useContext(ThemeContext);
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  //resolve text styles
  const fontSize = size ? size : 14;
  const fontWeight = weight ? weight : "normal";
  const fontStyle = style ? style : "normal";

  //resolve font family
  switch (family) {
    case "bold":
      family = "open-sans-bold";
      break;
    default:
      family = "open-sans-regular";
  }

  //resolve font color
  switch (color) {
    case "secondary":
      color = Colors.secondayText;
      break;
    case "info":
      color = Colors.infoText
      break;
    default:
      color = Colors.primaryText
  }

  return (
    <Text
      style={{
        fontFamily: family,
        fontSize,
        fontWeight,
        fontStyle,
        color,
        ...css
      }}
    >
      {title}
    </Text>
  );
}

export default AppText;
