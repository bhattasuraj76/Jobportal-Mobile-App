import React from "react";
import { Text } from "react-native";

export default function ErrorText({ children }) {
  return (
    <Text
      style={{
        fontSize: 16,
        textTransform: "uppercase",
        color: "#ff0000",
      }}
    >
      {children}
    </Text>
  );
}
