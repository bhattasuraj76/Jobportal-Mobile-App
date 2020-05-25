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
        ...styles.containerFluid,
        backgroundColor: Colors.secondaryBg,
        ...(isThemeDark && { borderTopColor: "#ffffff", borderTopWidth: 0.26 }),
      }}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  containerFluid: {
    flex: 1
  },
});

export default ContainerFluid;
