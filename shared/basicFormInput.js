import React from 'react'
import { StyleSheet, TextInput } from "react-native";

export default function BasicFormInput(props) {
  return (
    <TextInput
      style={{
        ...styles.input,
        ...(!props.isEditing && styles.inputNotEditable),
      }}
      editable={props.isEditing ? true : false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  inputNotEditable: {
    backgroundColor: "#ccc",
    borderWidth: 0,
  },
});
