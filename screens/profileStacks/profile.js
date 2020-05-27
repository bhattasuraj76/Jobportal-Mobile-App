import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles, images } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { ListItem } from "react-native-elements";

function Profile({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);

  const list = [
    {
      title: "Basci Info",
      icon: "info-outline",
      onPress: () => {
        navigation.navigate("HomeTab");
      },
    },
    {
      title: "Resume",
      icon: "attach-file",
      onPress: () => {
        navigation.navigate("HomeTab");
      },
    },
    {
      title: "Jobs Applied",
      icon: "developer-board",
      onPress: () => {
        navigation.navigate("HomeTab");
      },
    },

    {
      title: "Change Password",
      icon: "border-color",
      onPress: () => {
        navigation.navigate("HomeTab");
      },
    },
    {
      title: "Logout",
      icon: "history",
      onPress: () => {
        navigation.navigate("HomeTab");
      },
    },
  ];

  return (
    <ScrollView>
      {/* top content start */}
      <View style={{}}>
        <ImageBackground
          source={require("../../assets/img/sanj.jpg")}
          style={{
            blurRadius: 3,
            position: "relative",
            zIndex: 1,
            minHeight: 240,
            resizeMode: "contain",
          }}
        >
          {/* overlay start */}
          <View
            style={{
              minHeight: 240,
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 5,
              alignItems: "center",
              backgroundColor: "rgba(18,117,216,0.5)",
              justifyContent: "center",
            }}
          >
            {/* profile image wrapper start */}
            <View
              style={{
                position: "relative",
              }}
            >
              {/* edit profile btn start */}
              <View
                style={{
                  position: "absolute",
                  bottom: 15,
                  right: -2,
                  zIndex: 1,
                }}
              >
                <TouchableOpacity>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 400 / 2,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isThemeDark ? "#ccc" : "#eee",
                    }}
                  >
                    <Icon name="edit" size={24} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
              {/* edit profile btn start */}

              <Image
                source={require("../../assets/img/sanj.jpg")}
                style={{
                  height: 150,
                  width: 150,
                  borderColor: "#ddd",
                  borderWidth: 4,
                  borderRadius: 400 / 2,
                }}
              />
            </View>
            {/* profile image wrapper end */}

            {/* user info start */}
            <View style={{ alignItems: "center", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontFamily: "open-sans-semi-bold-italic",
                }}
              >
                John Doe
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#eee",
                  fontFamily: "open-sans-regular",
                }}
              >
                johndoe@xyz.com
              </Text>
            </View>
            {/* user info end */}
          </View>

          {/* overlay end */}
        </ImageBackground>
      </View>
      {/* top content end */}

      {/* menu options start */}
      <View style={{ flex: 1, alignItems: "stretch" }}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{
              name: item.icon,
              type: item.iconType,
              color: !isThemeDark ? "#333" : "#fff",
            }}
            bottomDivider
            onPress={item.onPress}
            containerStyle={{
              backgroundColor: isThemeDark ? "#000" : "#fff",
              paddingVertical: 20,
            }}
            titleStyle={{ color: !isThemeDark ? "#333" : "#fff" }}
            pad={20}
          />
        ))}
      </View>
      {/* menu options end */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({

});
export default Profile;
