import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import AppText from "../../shared/appText";

function Profile() {
     return (
       <Container>
         <AppText title="Profile" />
       </Container>
     );
}

export default Profile;
