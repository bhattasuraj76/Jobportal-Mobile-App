import React, { useContext } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SearchInput(props) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark ? "#fff" : "#333";

  return (
    <TextInput
      style={{
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        fontSize: 18,
        color
      }}
      {...props}
    />
   
  );
}
