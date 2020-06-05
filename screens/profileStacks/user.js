import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AppText from "../../shared/appText";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import { AuthContext } from "../../contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Asset } from "expo-asset";
import Axios from "axios";
import { images } from "../../styles/globalStyles";
import { apiPath } from "../../utils/constants/Consts";
import { serializeErrors } from "../../utils/Helpers";

function User({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { authUser, setUnauthStatus, updateAuthUserProfile } = useContext(
    AuthContext
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  //default display picture
  const defaultDPUri = Asset.fromModule(images.defaultProfile).uri;

  //ask for permission if ios
  useEffect(() => {
    getPermissionAsync();
  }, []);


  //ask for user permission for camera roll
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions!");
      }
    }
  };

  //aync open image picker
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  };

  //change display picture
  const handleDPChange = () => {

    _pickImage()
      .then((image) => {
        setIsSubmitting(true);

        let photo = {
          uri: image.uri,
          type: "image/png",
          name: "xyz.png",
        };

        //use formdata
        let formData = new FormData();
        formData.append("profile", photo);

        _uploadDisplayPicture(formData)
          .then((user) => {
            if (!user) return;
            updateAuthUserProfile(user.profile).then(() => {
              alert("Successfully updated profile");
            });
          })
          .catch((err) => console.log(err))
          .then(() => setIsSubmitting(false));
      })
      .catch(function (error) {
        console.log(error.response);
      });
     
  };

  //async upload display picture
  const _uploadDisplayPicture = async (formData) => {
    let options = {
      method: "POST",
      url: `${apiPath}/jobseeker/edit-profile`,
      data: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data;",
      },
    };

    try {
      let result = await Axios(options).then((res) => res.data);
      if (result.resp == 1) return result.user;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request cancelled");
      } else if (err.response) {
        console.log(err.response);

        if (err.response.status == 422)
          reportErrors(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          reportErrors(serializeErrors({ error: err.response.data.message }));
        else
          reportErrors(
            serializeErrors({ error: "Failed to change profile picture" })
          );
      } else {
        console.log(err);
      }
    }
  };

  //report errors to user
  const reportErrors = (error) => {
    if (!error) return;
    Alert.alert(
      "Error",
      error,
      [
        { text: "OK", onPress: () => console.log("Okey") },
      ],
      { cancelable: false }
    );
  };

  //handle logout user
  const logoutUser = () => {
    //destroy user value
    setUnauthStatus().then(() => {
      //navigate to profile
      navigation.navigate("ProfileTab", {
        screen: "Profile",
      });
    });
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
      onPress: () => logoutUser(),
    },
  ];

  return (
    <ScrollView>
      {/* top content start */}
      <View>
        <ImageBackground
          source={{
            uri: authUser.profile || defaultDPUri,
          }}
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
                <TouchableOpacity opacity={1} onPress={() => handleDPChange()}>
                  <View
                    style={{
                      ...styles.profileEditBtn,
                      backgroundColor: isThemeDark ? "#ccc" : "#eee",
                    }}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator size={24} color="#000" />
                    ) : (
                      <Icon name="edit" size={24} color="#000" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <Image
                source={{
                  uri: authUser.profile || defaultDPUri,
                }}
                style={styles.displayPicture}
              />
            </View>
            {/* profile image wrapper end */}

            {/* user info start */}
            <View style={styles.userInfo}>
              {authUser.name && (
                <AppText size={22} color="light" family="semi-bold-italic">
                  {authUser.name}
                </AppText>
              )}

              {authUser.email && (
                <AppText size={16} color="light">
                  {authUser.email}
                </AppText>
              )}
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
