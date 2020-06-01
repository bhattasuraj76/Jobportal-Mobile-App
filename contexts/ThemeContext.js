import * as React from "react";
/** Custom Hooks */
import useThemeHandler from "../utils/custom-hooks/ThemeHandler";
/** Utils */
import { DEFAULT_THEME } from "../utils/constants/Consts";
import { getStoredTheme } from "../utils/Helpers";
import { DEFAULT_IS_THEME_DARK } from "../utils/constants/Consts";

export const ThemeContext = React.createContext({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
  isThemeDark: (DEFAULT_THEME === "dark" ? true : false),
});

const ThemeContextProvider = ({ children }) => {
  const { theme, toggleTheme, isThemeDark } = useThemeHandler(
    getStoredTheme() // fetches stored theme value
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isThemeDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
