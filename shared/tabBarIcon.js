import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function TabBarIcon({ name, size, color }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
}

export default TabBarIcon;
