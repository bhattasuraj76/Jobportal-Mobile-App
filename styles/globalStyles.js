import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
  },
  rowJustifyCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowJustifyAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowJustifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowCenterCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexGrow: {
    flexGrow: 1,
  },
  contentWrapperCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#333111",
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
  authForm: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "center",
  },
});

export const images = {
  defaultLogo: require("../assets/img/default-logo.png"),
  defaultCover: require("../assets/img/default-cover.jpg"),
  defaultProfile: require("../assets/img/default-profile.png"),
};
