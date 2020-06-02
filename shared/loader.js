import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";

export default function Loader({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark
    ? DarkThemeColors.primaryText
    : DefaultThemeColors.infoBg;
    
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={70} color={color} />
    </View>
  );
}
