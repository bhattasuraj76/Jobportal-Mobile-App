import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DarkThemeColors, DefaultThemeColors } from "../utils/constants/Colors";
import { globalStyles, images } from "../styles/globalStyles";
import Icon from "./icon";
import { ThemeContext } from "../contexts/ThemeContext";
import AppText from "./appText";
import { TouchableOpacity } from "react-native-gesture-handler";

function JobAppliedBox({ job, onPress }) {
  const { isThemeDark } = useContext(ThemeContext);
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  return (
    <View style={{ ...styles.JobAppliedBox, backgroundColor: Colors.primaryBg }}>
      <Image source={images.defaultLogo} style={styles.logo} />
      <View style={styles.jobInfo}>
        <TouchableOpacity onPress={() => onPress(job)}>
          <AppText size={16} color="info" family="semi-bold">
            {job.title}
          </AppText>
        </TouchableOpacity>
        <AppText color="secondary" weight="600" size={14} family="semi-bold">
          {job.company.name}
        </AppText>

        <View style={styles.jobInfoBody}>
          <View style={globalStyles.rowAlignCenter}>
            <Icon name="location-on" size={14} color="#666666" />
            <AppText color="secondary" size={12}>
              <Text style="marginLeft: 5"> {job.company.address}</Text>
            </AppText>
          </View>
          <View style={globalStyles.rowAlignCenter}>
            <Icon name="attach-money" size={14} color="#666666" />
            <AppText color="secondary" size={12}>
              <Text style="marginLeft: 5"> {job.salary} </Text>
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  JobAppliedBox: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomColor: "#c1c1c1",
    borderBottomWidth: 1,
  },
  logo: {
    height: 70,
    width: 70,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  jobInfo: { marginLeft: 30, flexGrow: 1, justifyContent: "center" },

  jobInfoBody: {
    marginLeft: 10,
    marginVertical: 5,
  }

});

export default JobAppliedBox;
