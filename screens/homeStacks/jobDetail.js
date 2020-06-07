import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { images, globalStyles } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import AppBtn from "../../shared/appBtn";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  DefaultThemeColors,
  DarkThemeColors,
} from "../../utils/constants/Colors";
import { ThemeContext } from "../../contexts/ThemeContext";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";
import { Asset } from "expo-asset";
import Loader from "../../shared/loader";
import { AuthContext } from "../../contexts/AuthContext";

function JobDetail({ navigation, route }) {
  //retun null if there no job slug
  if (!route.params.jobSlug) {
    return null;
  }

  //state
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState("");
  const [showJobInfo, setShowJobInfo] = useState(true);
  const [showJobDescription, setshowDesription] = useState(false);
  const [showAboutCompany, setShowAboutCompany] = useState(false);
  const {authUser} = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //default logo and cover uri
  const defaultCoverUri = Asset.fromModule(images.defaultCover).uri;
  const defaultLogoUri = Asset.fromModule(images.defaultLogo).uri;

  //fetch job detail
  const fetchJobDetail = async (slug) => {
    try {
      let data = await Axios.get(`${apiPath}/job/${slug}`).then(
        (res) => res.data
      );
      if (data.resp == 1) return data.job;
    } catch (err) {
      console.error(err);
    }
  };

  //handle applyforjob btn press
  const applyForJob = async (job_id) => {
    if(!job_id) return;

    const isLoggedIn = authUser.token ? true: false;
    if(!isLoggedIn){
      alert("Please login to apply for job");
      return;
    } 

    setIsSubmitting(true);
    try{
      let response = await Axios.post(`${apiPath}/apply-for-job`, {job_id}).then(res => res.data);
      if (response.resp == 1) alert("Successfully applied for job.");
      else alert(response.message);
    }catch(err){
      console.log(err);
    }
    setIsSubmitting(false);
   
  };

  //fetch job detail on first render and job slug change only
  useEffect(() => {
    fetchJobDetail(route.params.jobSlug)
      .then((job) => {
        if (job) setJob(job);
      })
      .catch((err) => console.log(err))
      .then(() => setIsLoading(false));
  }, [route]);

  return (
    <ContainerFluid>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* company cover */}
          <View style={{ marginBottom: 20 }}>
            <ImageBackground
              source={{
                uri: job.employer.logo ? job.employer.logo : defaultCoverUri,
              }}
              style={styles.companyCover}
            >
              <Image
                source={{
                  uri: job.employer.logo ? job.employer.logo : defaultLogoUri,
                }}
                style={styles.companyLogo}
              />
            </ImageBackground>
          </View>
          {/* company cover */}

          {/* content start */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* job overview start */}
            <View style={{ marginTop: 10 }}>
              <AppText size={22} family="semi-bold" color="info">
                {job.title}
              </AppText>
              <AppText size={18} family="semi-bold" color="secondary">
                {job.employer.name}
              </AppText>
              <View style={{ marginLeft: 15, marginVertical: 7 }}>
                <View style={globalStyles.rowAlignCenter}>
                  <Icon name="location-on" size={20} color="#666666" />
                  <AppText color="secondary" size={16}>
                    <Text style="marginLeft: 5"> {job.employer.address}</Text>
                  </AppText>
                </View>
                <View style={globalStyles.rowAlignCenter}>
                  <Icon name="attach-money" size={20} color="#666666" />
                  <AppText color="secondary" size={16}>
                    <Text style="marginLeft: 5"> {job.salary} </Text>
                  </AppText>
                </View>
              </View>
            </View>
            {/* job overview end */}

            {/* accordian wrapper start */}
            <View style={{ marginTop: 20 }}>
              {/* job info */}
              <Accordian>
                <TouchableOpacity
                  onPress={(e) => {
                    console.log(e);
                    setShowJobInfo(!showJobInfo);
                  }}
                >
                  <AccordianHeader>
                    <AppText size={18} family="semi-bold" color="info">
                      Job Info
                    </AppText>
                    <Icon
                      name={
                        showJobInfo
                          ? "keyboard-arrow-down"
                          : "keyboard-arrow-right"
                      }
                      size={24}
                    />
                  </AccordianHeader>
                </TouchableOpacity>

                {showJobInfo && (
                  <AccordianContent>
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
                      Education : <InfoText>{job.qualification}</InfoText>
                    </TitleText>
                    <TitleText>
                      Experience : <InfoText>{job.experience}</InfoText>
                    </TitleText>
                    <TitleText>
                      Deadline : <InfoText>{job.deadline}</InfoText>
                    </TitleText>
                  </AccordianContent>
                )}
              </Accordian>

              {/* job info */}

              {/* job description */}
              <Accordian>
                <TouchableOpacity
                  onPress={(e) => {
                    console.log(e);
                    setshowDesription(!showJobDescription);
                  }}
                >
                  <AccordianHeader>
                    <AppText size={18} family="semi-bold" color="info">
                      Job Descripton
                    </AppText>
                    <Icon
                      name={
                        showJobDescription
                          ? "keyboard-arrow-down"
                          : "keyboard-arrow-right"
                      }
                      size={24}
                    />
                  </AccordianHeader>
                </TouchableOpacity>
                {showJobDescription && (
                  <AccordianContent>
                    <InfoText>{job.description}</InfoText>
                  </AccordianContent>
                )}
              </Accordian>
              {/* job description */}

              {/* about company */}
              <Accordian>
                <TouchableOpacity
                  onPress={(e) => {
                    console.log(e);
                    setShowAboutCompany(!showAboutCompany);
                  }}
                >
                  <View
                    style={{
                      borderColor: "#ccc",
                      border: 0,
                      borderBottomWidth: 1,
                    }}
                  >
                    <AccordianHeader>
                      <AppText size={18} family="semi-bold" color="info">
                        About Company
                      </AppText>
                      <Icon
                        name={
                          showAboutCompany
                            ? "keyboard-arrow-down"
                            : "keyboard-arrow-right"
                        }
                        size={24}
                      />
                    </AccordianHeader>
                  </View>
                </TouchableOpacity>

                {showAboutCompany && (
                  <AccordianContent>
                    <TitleText>
                      Address : <InfoText>{job.employer.address}</InfoText>
                    </TitleText>
                    <TitleText>
                      Email : <InfoText>{job.employer.email}</InfoText>
                    </TitleText>
                    <TitleText>
                      Phone : <InfoText>{job.employer.phone}</InfoText>
                    </TitleText>
                  </AccordianContent>
                )}
              </Accordian>
              {/* about about */}
            </View>
            {/* accordian wrapper start */}
          </View>
          {/* content end */}

          {/* job apply btn */}
          <View style={{ marginTop: 30 }}>
            <AppBtn title="Appy for Job" onPress={() => applyForJob(job.id)} disabled={isSubmitting} />
          </View>
          {/* job apply btn */}
        </ScrollView>
      )}
    </ContainerFluid>
  );
}

function Accordian({ children }) {
  const { isThemeDark } = useContext(ThemeContext);
  const backgroundColor = isThemeDark
    ? DarkThemeColors.primaryBg
    : DefaultThemeColors.primaryBg;
  return (
    <View style={{ ...styles.accordian, backgroundColor }}>{children}</View>
  );
}

function AccordianHeader({ children }) {
  return <View style={styles.accordianHeader}>{children}</View>;
}

function AccordianContent({ children }) {
  return <View style={styles.accordianContent}>{children}</View>;
}

function TitleText({ children }) {
  return (
    <Text style={styles.titleText}>
      <AppText size={16} color="primary">
        {children}
      </AppText>
    </Text>
  );
}

function InfoText({ children }) {
  return (
    <Text style={styles.infoText}>
      <AppText size={18} color="info">
        {children}
      </AppText>
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
  accordian: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  accordianHeader: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  accordianContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderColor: "#ccc",
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoText: {
    paddingLeft: 20,
  },
  titleText: {
    marginBottom: 15,
  },
});

export default JobDetail;
