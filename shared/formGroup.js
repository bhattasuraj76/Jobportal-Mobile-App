import React from "react";
import { View } from "react-native";

export default function FormGroup({ children }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginBottom: 20,
      }}
    >
      {children}
    </View>
  );
}
