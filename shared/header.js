import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Switch, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Header() {
  //fetch theme context value
  const { toggleTheme, isThemeDark } = useContext(ThemeContext);

   //update theme context value 
  const handleThemeToggle = () => {
    toggleTheme();
  };

  //handle logo press event
  const navigation = useNavigation();
  const openMenu = () => {
    navigation.navigate("HomeTab");
  };

  return (
    <View style={styles.header}>
      <Ionicons
        name="logo-javascript"
        size={32}
        color="white"
        onPress={openMenu}
      />
      <Text style={styles.headerText}>Jobs Hunt</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isThemeDark ? "#3ea6ff" : "#ffffff"}
        onValueChange={handleThemeToggle}
        value={isThemeDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 28,
    fontFamily: "open-sans-regular",
    textAlign: "center",
    letterSpacing: 1,
    color: "#fff",
  },
});
