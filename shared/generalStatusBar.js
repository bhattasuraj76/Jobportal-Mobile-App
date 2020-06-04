import React, { useContext } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

const GeneralStatusBar = (props) => {
  const {isThemeDark} = useContext(ThemeContext);
  const backgroundColor = isThemeDark
    ? DarkThemeColors.statusBarBg
    : DefaultThemeColors.statusBarBg;

  return (
    <View style={[styles.statusBar, { backgroundColor:"#fff" }]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: 0,
  },
});

export default GeneralStatusBar;
