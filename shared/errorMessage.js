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
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
  },
});
