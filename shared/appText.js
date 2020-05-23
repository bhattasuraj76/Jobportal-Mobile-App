import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function AppText({ title }) {
   const { isThemeDark } = useContext(ThemeContext);
  //colors object
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  return (
    <Text style={{ ...styles.title, color: Colors.primaryText }}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: "open-sans-regular",
  },
});

export default AppText;
