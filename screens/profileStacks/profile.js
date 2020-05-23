import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import TitleText from "../../shared/titleText";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";

function Profile() {
     return (
       <Container>
         <TitleText title="Profile" />
       </Container>
     );
}

export default Profile;
