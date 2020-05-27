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
import { AuthContext } from "../../contexts/AuthContext";
import AppBtn from "../../shared/appBtn";

function Profile({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { authUser , setUnauthStatus} = useContext(AuthContext);

  const isUserLoggedIn = authUser.token ? true : false;

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
        setUnauthStatus();
        navigation.navigate("ProfileTab",{screen: "Profile"});
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {isUserLoggedIn ? (
        <ScrollView>
          {/* top content start */}
          <View>
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
                  <AppText size={22} color="light" family="semi-bold-italic">
                    John Doe
                  </AppText>

                  <AppText size={16} color="light">
                    johndoe@xyz.com
                  </AppText>
                </View>
                {/* user info end */}
              </View>

              {/* overlay end */}
            </ImageBackground>
          </View>
          {/* top content end */}

          {/* menu options start */}
          <View>
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
                  paddingBottom: 19
                }}
                titleStyle={{ color: !isThemeDark ? "#333" : "#fff"}}
                pad={25}
              />
            ))}
          </View>
          {/* menu options end */}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View>
            <AppText size={18}>Please sign in to view your profile</AppText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileTab", { screen: "Login" })
                }
              >
                <AppText size={20} family="semi-bold" color="info">
                  Log In
                </AppText>
              </TouchableOpacity>

              <Text style={{ marginHorizontal: 10 }}>
                <AppText size={18}>or</AppText>
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileTab", { screen: "Register" })
                }
              >
                <AppText size={20} family="semi-bold" color="info">
                  Register
                </AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* <AppText size={16}>Don't have an account yet?</AppText>
          <View sytle={{ width: 400 }}>
            <AppText size={18} family="bold" color="info"></AppText>
          </View> */}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({});
export default Profile;
