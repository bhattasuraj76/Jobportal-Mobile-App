import React, { useContext } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Input(props) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark ? "#fff" : "#333";

  return (
    <TextInput
      style={{
        height: 40,
        marginBottom: 20,
        color: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        fontSize: 18,
      }}
      {...props}
    />
  );
}
