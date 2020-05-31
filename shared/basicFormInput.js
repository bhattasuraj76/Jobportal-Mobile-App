import React, { useContext } from 'react'
import { StyleSheet, TextInput } from "react-native";
import { ThemeContext } from '../contexts/ThemeContext';

export default function BasicFormInput(props) {
 const {isThemeDark} = useContext(ThemeContext);

 const color = isThemeDark && props.isEditing ? '#fff' : '#111'
  return (
    <TextInput
      style={{
        ...styles.input,
        ...(!props.isEditing && styles.inputNotEditable),
        color
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
