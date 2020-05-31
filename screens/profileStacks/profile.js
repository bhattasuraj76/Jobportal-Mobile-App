import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";

import { AuthContext } from "../../contexts/AuthContext";
import * as DocumentPicker from "expo-document-picker";
import DefaultDisplayPicture from "../../assets/img/sanj.jpg";
import Guest from "./guest";
import User from "./user";

function Profile({ navigation }) {
  const { authUser, setUnauthStatus } = useContext(AuthContext);

  const isUserLoggedIn = true;
  // const isUserLoggedIn = authUser.token ? true : false;

  return (
    <View style={{ flex: 1 }}>
      {isUserLoggedIn ? (
        <User navigation={navigation} />
      ) : (
        <Guest navigation={navigation} />
      )}
    </View>
  );
}

export default Profile;
