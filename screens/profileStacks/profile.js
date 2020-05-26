import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text,Image } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import AppTitle from "../../shared/appTitleText";
import AppText from "../../shared/appText";

function Profile() {
     return (
      <View>
        <View style={{alignItems:'center'}}>
          <Image
          source={require('../../assets/img/default-profile.png')}
          style={{
            height:150,
            width:150
          }}
          />
        </View>
      </View>
     );
}

export default Profile;
