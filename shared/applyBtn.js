import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ApplyBtn({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 10,
    backgroundColor: "#1275d8",
    width: "100%",
  },
  buttonTitle: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
});
