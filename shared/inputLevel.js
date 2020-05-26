import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

export default function InputLevel({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark ? "#fff" : "#333";

  return (
    <Text
      style={{
        fontSize: 18,
        fontFamily: 'open-sans-regular',
        marginBottom: 10,
        color: color,
      }}
    >
      {children}
    </Text>
  );
}

