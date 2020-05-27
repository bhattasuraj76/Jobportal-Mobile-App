import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";


function ContainerFluid({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  //colors object
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primaryBg,
        ...(isThemeDark && { borderTopColor: "#ffffff", borderTopWidth: 0.26 }),
      }}
    >
      {children}
    </View>
  );
}

export default ContainerFluid;
