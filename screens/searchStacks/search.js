import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import AppText from "../../shared/appText";

function Search() {
  const {toggleTheme} = useContext(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      console.log('focused');
    })
  )
     return (
       <Container>
         <AppText title="Search" />
       </Container>
     );
}

export default Search;
