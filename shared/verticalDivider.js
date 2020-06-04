import React from "react";
import { View, StyleSheet } from "react-native";

export default function VerticalDivider() {
  return <View style={styles.divider}></View>;
}

const styles = StyleSheet.create({
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#fff",
    marginHorizontal: 8,
    alignSelf: "center"
  },
});
