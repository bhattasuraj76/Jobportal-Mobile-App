import React, { useContext } from "react";
import { Text } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function AppTitleText({ title, size, weight, style }) {
  const { isThemeDark } = useContext(ThemeContext);
  const fontSize = size ? size : 18;
  const fontWeight = weight ? weight : "normal";
  const fontStyle = fontStyle ? style : "normal";
  //colors object
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  return (
    <Text
      style={{
        fontFamily: "open-sans-bold",
        fontSize,
        fontWeight,
        fontStyle,
        color: Colors.primaryText,
      }}
    >
      {title}
    </Text>
  );
}

export default AppTitleText;
