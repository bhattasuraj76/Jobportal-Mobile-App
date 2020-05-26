import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";

function Icon({ name, size, color }) {
  //get theme color
  const { isThemeDark } = useContext(ThemeContext);
  color = isThemeDark ? "#fff" : color;
  return <MaterialIcons name={name} size={size} color={color} />;
}

export default Icon;
