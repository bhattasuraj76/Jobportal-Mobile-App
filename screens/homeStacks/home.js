import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import TitleText from "../../shared/titleText";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";

function Home ({navigation}) {
    return (
      <Container>
        <TitleText title="Home" />
      </Container>
    );
}

export default Home;