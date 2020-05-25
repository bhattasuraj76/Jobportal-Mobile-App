import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { DefaultThemeColors } from "../utils/constants/Colors";

export default function JobApplyBtn({ title, onPress }) {
  return (
    <TouchableOpacity style={{
    padding: 10,
    backgroundColor: DefaultThemeColors.infoBg,
    width: "100%",
  }} onPress={onPress}>
      <Text style={
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  }>{title}</Text>
    </TouchableOpacity>
  );
}


