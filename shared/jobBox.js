import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";
import { globalStyles } from "../styles/globalStyles";
import Icon from "./icon";
import { ThemeContext } from "../contexts/ThemeContext";
import AppText from "./appText";
import { TouchableOpacity } from "react-native-gesture-handler";

function JobBox({ job , onPress}) {
  const { isThemeDark } = useContext(ThemeContext);
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;
  
  return (
    <View style={{ ...styles.jobBox, backgroundColor: Colors.primaryBg }}>
      <Image
        source={require("../assets/img/default-logo.png")}
        style={styles.logo}
      />
      <View style={styles.jobInfo}>
        <TouchableOpacity onPress={() => onPress(job)}>
          <AppText title={job.title} size={18} family="bold" color="info"/>
        </TouchableOpacity>
        <AppText
          title={job.company.name}
          color="secondary"
          family="bold"
          size={15}
        />

        <View style={styles.jobInfoBody}>
          <View style={globalStyles.rowAlignCenter}>
            <Icon name="location-on" size={18} color="#666666" />
            <AppText
              title={job.company.address}
              color="secondary"
              size={14}
              css={{ marginLeft: 5 }}
            />
          </View>
          <View style={globalStyles.rowAlignCenter}>
            <Icon name="attach-money" size={18} color="#666666" />
            <AppText
              title={job.salary}
              color="secondary"
              size={14}
              css={{ marginLeft: 5 }}
            />
          </View>
        </View>
        <View style={styles.jobInfoFooter}>
          <AppText title={job.level} color="secondary" size={12} />
          <AppText title={`Deadline: ${job.deadline}`} color="info" size={12} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  jobBox: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomColor: "#c1c1c1",
    borderBottomWidth: 1,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  jobInfo: { marginLeft: 30, flexGrow: 1, justifyContent: "center" },

  companyName: {
    fontSize: 14,
    color: "#666666",
  },
  jobInfoBody: {
    marginLeft: 10,
    marginVertical: 5,
  },
  jobInfoBodyText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#666666",
    fontFamily: "open-sans-regular",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
  },
  salary: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobInfoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobInfoFooterText: {
    fontSize: 11,
    fontFamily: "open-sans-regular",
  },
});

export default JobBox;
