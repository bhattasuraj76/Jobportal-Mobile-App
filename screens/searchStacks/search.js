import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import TitleText from "../../shared/titleText";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";

function Search() {
  const {toggleTheme} = useContext(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      console.log('focused');
    })
  )
     return (
       <Container>
         <TitleText title="Search" />
       </Container>
     );
}

export default Search;
