import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { images, globalStyles } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import JobApplyBtn from "../../shared/jobApplyBtn";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  DefaultThemeColors,
  DarkThemeColors,
} from "../../utils/constants/Colors";
import { ThemeContext } from "../../contexts/ThemeContext";

function JobDetail({ navigation, route }) {
  const job = route.params.job;
  if (!job) {
    return navigation.goBack();
  }

  const [showJobInfo, setShowJobInfo] = useState(true);
  const [showJobDescription, setshowDesription ] = useState(false);
  const [showAboutCompany, setShowAboutCompany ] = useState(false);

  const applyForJob = () => {
    console.log("applied for job");
  };

  return (
    <ContainerFluid>
      <ScrollView>
        {/* company cover */}
        <View style={{ marginBottom: 20 }}>
          <ImageBackground
            source={images.defaultCover}
            style={styles.companyCover}
          >
            <Image source={images.defaultLogo} style={styles.companyLogo} />
          </ImageBackground>
        </View>
        {/* company cover */}

        {/* content start */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* job overview start */}
          <View style={{ marginTop: 10 }}>
            <AppText size={22} title={job.title} family="bold" color="info" />
            <AppText size={18} title={job.company.name} />
            <View style={{ marginLeft: 15, marginVertical: 7 }}>
              <View style={globalStyles.rowAlignCenter}>
                <Icon name="location-on" size={20} color="#666666" />
                <AppText
                  title={job.company.address}
                  color="secondary"
                  size={16}
                  css={{ marginLeft: 5 }}
                />
              </View>
              <View style={globalStyles.rowAlignCenter}>
                <Icon name="attach-money" size={20} color="#666666" />
                <AppText
                  title={job.salary}
                  color="secondary"
                  size={16}
                  css={{ marginLeft: 5 }}
                />
              </View>
            </View>
          </View>
          {/* job overview end */}

          {/* accordian wrapper start */}
          <View style={{ marginTop: 20 }}>
            {/* job info */}
            <View style={styles.accordian}>
              <TouchableOpacity
                onPress={(e) => {
                  console.log(e);
                  setShowJobInfo(!showJobInfo);
                }}
              >
                <View style={styles.accordianTitle}>
                  <AccordianTitle>Job Info</AccordianTitle>
                  <Icon
                    name={
                      showJobInfo
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-right"
                    }
                    size={24}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>

              {showJobInfo && (
                <View style={styles.accordianContent}>
                  <TitleText>
                    Categoy : <InfoText>{job.category}</InfoText>
                  </TitleText>
                  <TitleText>
                    Level : <InfoText>{job.level}</InfoText>
                  </TitleText>
                  <TitleText>
                    Type : <InfoText>{job.type}</InfoText>
                  </TitleText>
                  <TitleText>
                    Education : <InfoText>{job.education}</InfoText>
                  </TitleText>
                  <TitleText>
                    Experience : <InfoText>{job.experience}</InfoText>
                  </TitleText>
                  <TitleText>
                    Deadline : <InfoText>{job.deadline}</InfoText>
                  </TitleText>
                </View>
              )}
            </View>
            {/* job info */}

            {/* job description */}
            <View style={styles.accordian}>
              <TouchableOpacity
                onPress={(e) => {
                  console.log(e);
                  setshowDesription(!showJobDescription);
                }}
              >
                <View style={styles.accordianTitle}>
                  <AccordianTitle>Job Descripton</AccordianTitle>
                  <Icon
                    name={
                      showJobDescription
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-right"
                    }
                    size={24}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>
              {showJobDescription && (
                <View style={styles.accordianContent}>
                  <InfoText>{job.description}</InfoText>
                </View>
              )}
            </View>
            {/* job description */}

            {/* about company */}
            <View style={{ ...styles.accordian, borderBottomWidth: 1 }}>
              <TouchableOpacity
                onPress={(e) => {
                  console.log(e);
                  setShowAboutCompany(!showAboutCompany);
                }}
              >
                <View style={styles.accordianTitle}>
                  <AccordianTitle>About Company</AccordianTitle>
                  <Icon
                    name={
                      showAboutCompany
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-right"
                    }
                    size={24}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>

              {showAboutCompany && (
                <View style={styles.accordianContent}>
                  <TitleText>
                    Address : <InfoText>{job.company.address}</InfoText>
                  </TitleText>
                  <TitleText>
                    Email : <InfoText>{job.company.email}</InfoText>
                  </TitleText>
                  <TitleText>
                    Phone : <InfoText>{job.company.phone}</InfoText>
                  </TitleText>
                </View>
              )}
            </View>
            {/* about about */}
          </View>
          {/* accordian wrapper start */}
        </View>
        {/* content start */}

        {/* job apply btn */}
        <View style={{ marginTop: 30 }}>
          <JobApplyBtn title="Appy for Job" onPress={applyForJob} />
        </View>
        {/* job apply btn */}
      </ScrollView>
    </ContainerFluid>
  );
}

function AccordianTitle({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark
    ? DarkThemeColors.primaryText
    : DefaultThemeColors.infoText;
  return (
    <Text
      style={{
        fontSize: 18,
        fontFamily: "open-sans-bold",
        color,
      }}
    >
      {children}
    </Text>
  );
}

function TitleText({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark
    ? DarkThemeColors.primaryText
    : DefaultThemeColors.primaryText;

  return (
    <Text
      style={{
        fontSize: 16,
        fontFamily: "open-sans-regular",
        marginBottom: 15,
        color,
      }}
    >
      {children}
    </Text>
  );
}

function InfoText({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const color = isThemeDark
    ? DarkThemeColors.primaryText
    : DefaultThemeColors.infoText;

  return (
    <Text
      style={{
        marginLeft: 20,
        fontFamily: "open-sans-regular",
        fontSize: 18,
        color,
      }}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  companyCover: {
    minHeight: 200,
  },
  companyLogo: {
    height: 120,
    width: 120,
    borderColor: "#aaa",
    borderWidth: 1,
    position: "absolute",
    bottom: -20,
    left: 20,
  },
  accordian: { borderColor: "#ccc", borderWidth: 1, borderBottomWidth: 0 },
  accordianTitle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  accordianContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
});
export default JobDetail;
