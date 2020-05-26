import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function JobApplyBtn({ title, onPress }) {
  const { isThemeDark } = useContext(ThemeContext);
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        backgroundColor: Colors.btnPrimaryBg,
        width: "100%",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: Colors.btnPrimaryText,
          fontSize: 18,
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
