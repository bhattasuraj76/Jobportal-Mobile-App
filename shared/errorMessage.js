import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function ErrorMessage(props) {
  return (
    <View style={styles.errorWrapper}>
      <Text style={styles.errorText}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorWrapper: {
    backgroundColor: "#ff0000",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
  },
});
