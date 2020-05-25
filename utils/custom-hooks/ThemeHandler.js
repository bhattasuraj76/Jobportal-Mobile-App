import * as React from "react";
import { AsyncStorage } from "react-native";

const themeHandler = (initialState) => {
  const [theme, setTheme] = React.useState(initialState);

  const toggleTheme =  () => {
      try {
         let newTheme = theme === "dark" ? "default" : "dark";
        //  await AsyncStorage.setItem("theme", newTheme);
         setTheme(newTheme);
      } catch(e) {
          console.log(e);
      }
  };

  const isThemeDark = theme === "dark" ? true : false;
  
  return {
    theme,
    toggleTheme,
    isThemeDark
  };
};
export default themeHandler;
