import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#333",
  },
  paragraph: {
    fontFamily: "open-sans-regular",
    lineHeight: 20,
    marginVertical: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 8,
    fontSize: 18,
    marginBottom: 5,
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 10,
  },
});

export const images = {
  defaultLogo: require("../assets/img/default-logo.png"),
  defaultCover: require("../assets/img/default-cover.jpg"),
  defaultProfile: require("../assets/img/default-profile.png"),
};
