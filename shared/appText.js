import React, { useContext } from "react";
import { Text } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function AppText({ children, size, family, color }) {
  //get theme color
  const { isThemeDark } = useContext(ThemeContext);
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  //resolve text styles
  const fontSize = size ? size : 14;
  
  //resolve font Family
  switch (family) {
    case "light":
      family = "open-sans-light";
      break;
    case "light-italic":
      family = "light-italic";
      break;
    case "semi-bold":
      family = "open-sans-semi-bold";
      break;
    case "semi-bold-italic":
      family = "open-sans-semi-bold-italic";
      break;
    case "bold":
      family = "open-sans-bold";
      break;
    case "bold-italic":
      family = "open-sans-bold";
      break;
    default:
      family = "open-sans-regular";
      break;
  }

  //resolve font color
  switch (color) {
    case "secondary":
      color = Colors.secondayText;
      break;
    case "info":
      color = Colors.infoText;
      break;
    case "light":
      color = "#fff";
      break;
    case "dark":
      color = "#333";
      break;
    default:
      color = Colors.primaryText;
  }

  return (
    <Text
      style={{
        fontFamily: family,
        fontSize,
        color
      }}
    >
      {children}
    </Text>
  );
}

export default AppText;
