import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AppText from "../../shared/appText";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import { AuthContext } from "../../contexts/AuthContext";
import DefaultDisplayPicture from "../../assets/img/sanj.jpg";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Assets } from "@react-navigation/stack";
import { Asset } from "expo-asset";
  
function User({ navigation }) {
  const imageURI = Asset.fromModule(require("../../assets/img/sanj.jpg")).uri;

  const { isThemeDark } = useContext(ThemeContext);
  const { authUser, setUnauthStatus } = useContext(AuthContext);

  const [displayPicture, setDisplayPicture] = useState(imageURI);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setDisplayPicture(result.uri);
      }

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const _changeDisplayPicture = () => {
    _pickImage();
  };

  const list = [
    {
      title: "Basci Info",
      icon: "info-outline",
      onPress: () => {
        navigation.navigate("ProfileTab", {
          screen: "BasicInfo",
        });
      },
    },
    {
      title: "Resume",
      icon: "attach-file",
      onPress: () => {
        navigation.navigate("ProfileTab", {
          screen: "Resume",
        });
      },
    },
    {
      title: "Jobs Applied",
      icon: "developer-board",
      onPress: () => {
        navigation.navigate("ProfileTab", {
          screen: "JobsApplied",
        });
      },
    },

    {
      title: "Change Password",
      icon: "border-color",
      onPress: () => {
        navigation.navigate("ProfileTab", {
          screen: "ChangePassword",
        });
      },
    },
    {
      title: "Logout",
      icon: "history",
      onPress: () => {
        setUnauthStatus();
        navigation.navigate("ProfileTab", {
          screen: "Profile",
        });
      },
    },
  ];

  return (
    <ScrollView>
      {/* top content start */}
      <View>
        <ImageBackground
          source={{ uri: displayPicture }}
          style={styles.profileBg}
        >
          {/* overlay content start */}
          <View style={styles.profileOverlay}>
            {/* profile image wrapper start */}
            <View style={styles.profileImageWrapper}>
              <View
                style={{
                  ...styles.profileEditBtnWrap,
                }}
              >
                <TouchableOpacity
                  opacity={1}
                  onPress={() => _changeDisplayPicture()}
                >
                  <View
                    style={{
                      ...styles.profileEditBtn,
                      backgroundColor: isThemeDark ? "#ccc" : "#eee",
                    }}
                  >
                    <Icon name="edit" size={24} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>

              <Image
                source={{ uri: displayPicture }}
                style={styles.displayPicture}
              />
            </View>
            {/* profile image wrapper end */}

            {/* user info start */}
            <View style={styles.userInfo}>
              <AppText size={22} color="light" family="semi-bold-italic">
                John Doe
              </AppText>

              <AppText size={16} color="light">
                johndoe@xyz.com
              </AppText>
            </View>
            {/* user info end */}
          </View>
          {/* overlay content end */}
        </ImageBackground>
      </View>
      {/* top content end */}

      {/* menu list start */}
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{
              name: item.icon,
              color: !isThemeDark ? "#333" : "#fff",
            }}
            bottomDivider
            onPress={item.onPress}
            containerStyle={{
              backgroundColor: isThemeDark ? "#000" : "#fff",
              paddingBottom: 19,
            }}
            titleStyle={{
              color: !isThemeDark ? "#333" : "#fff",
            }}
            pad={25}
          />
        ))}
      </View>
      {/* menu list end */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileBg: {
    position: "relative",
    zIndex: 1,
    minHeight: 240,
    resizeMode: "contain",
  },
  profileOverlay: {
    minHeight: 240,
    alignItems: "center",
    backgroundColor: "rgba(18,117,216,0.5)",
    justifyContent: "center",
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileEditBtnWrap: {
    position: "absolute",
    bottom: 8,
    right: 2,
    zIndex: 1,
  },
  profileEditBtn: {
    width: 45,
    height: 45,
    borderRadius: 400 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  displayPicture: {
    height: 150,
    width: 150,
    borderColor: "#ddd",
    borderWidth: 4,
    borderRadius: 400 / 2,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 5,
  },
});

export default User;