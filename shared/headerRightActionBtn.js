import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function HeaderRightActionBtn(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={styles.title}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#fff",
  },
});