import * as React from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import RadioForm from "react-native-simple-radio-button";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";

export default function Checkbox(props) {
  const { isThemeDark } = React.useContext(ThemeContext);

  return (
    <RadioForm
      style={styles.radioInput}
      buttonSize={20}
      buttonOuterSize={20}
      formHorizontal={true}
      labelHorizontal={true}
      selectedButtonColor={
        isThemeDark ? DarkThemeColors.primaryText: DefaultThemeColors.infoBg
      }
      buttonColor={isThemeDark ? "#fff" : DefaultThemeColors.infoBg}
      animation={true}
      labelStyle={{ fontSize: 16, color: isThemeDark ? "#fff" : "#111" }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  radioInput: {
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
    justifyContent: "space-between",
    shadowColor: "#ff0000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
});
