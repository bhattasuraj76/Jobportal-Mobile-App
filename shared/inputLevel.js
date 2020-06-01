import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import AppText from "./appText";

export default function InputLevel({ children }) {
  return (
    <Text
      style={{
        marginBottom: 10,
      }}
    >
      <AppText size={18} >{children}</AppText>
    </Text>
  );
}

