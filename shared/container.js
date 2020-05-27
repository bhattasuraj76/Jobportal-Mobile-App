import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

function Container({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  //colors object
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.secondaryBg,
        ...(isThemeDark && { borderTopColor: "#ffffff", borderTopWidth: 0.26 }),
      }}
    >
      {children}
    </View>
  );
}

export default Container;
