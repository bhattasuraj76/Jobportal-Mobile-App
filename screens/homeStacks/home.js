import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { ScrollView } from "react-native-gesture-handler";

function Home({ navigation }) {
  const [jobs, setJobs] = useState([
    {
      title: "Web Developer",
      salary: "Rs. 20,000",
      category: "It/Computing",
      type: "Full Time",
      level: "Mid Level",
      education: "BIT/BIM",
      experience: "2-3 years",
      deadline: "2 weeks from now",
      description: "Lorem ipsum",
      company: {
        name: "ABC Company",
        address: "Samakhusi, Kathmandu",
        email: "xyz@gmail.com",
        phone: "+977-9890000000",
      },
    },
    {
      title: "Web Developer",
      salary: "Rs. 20,000",
      category: "It/Computing",
      type: "Full Time",
      level: "Mid Level",
      education: "BIT/BIM",
      experience: "2-3 years",
      deadline: "2 weeks from now",
      description: "Lorem ipsum",
      company: {
        name: "ABC Company",
        address: "Samakhusi, Kathmandu",
        email: "xyz@gmail.com",
        phone: "+977-9890000000",
      },
    },
    {
      title: "Web Developer",
      salary: "Rs. 20,000",
      category: "It/Computing",
      type: "Full Time",
      level: "Mid Level",
      education: "BIT/BIM",
      experience: "2-3 years",
      deadline: "2 weeks from now",
      description: "Lorem ipsum",
      company: {
        name: "ABC Company",
        address: "Samakhusi, Kathmandu",
        email: "xyz@gmail.com",
        phone: "+977-9890000000",
      },
    },
    {
      title: "Web Developer",
      salary: "Rs. 20,000",
      category: "It/Computing",
      type: "Full Time",
      level: "Mid Level",
      education: "BIT/BIM",
      experience: "2-3 years",
      deadline: "2 weeks from now",
      description: "Lorem ipsum",
      company: {
        name: "ABC Company",
        address: "Samakhusi, Kathmandu",
        email: "xyz@gmail.com",
        phone: "+977-9890000000",
      },
    },
    {
      title: "Web Developer",
      salary: "Rs. 20,000",
      category: "It/Computing",
      type: "Full Time",
      level: "Mid Level",
      education: "BIT/BIM",
      experience: "2-3 years",
      deadline: "2 weeks from now",
      description: "Lorem ipsum",
      company: {
        name: "ABC Company",
        address: "Samakhusi, Kathmandu",
        email: "xyz@gmail.com",
        phone: "+977-9890000000",
      },
    },
  ]);

  const gotoJobDetail = (job) => {
    navigation.navigate("HomeTab", {
      screen: "JobDetail",
      params: {
        job,
      },
    });
  };

  return (
    <ContainerFluid>
      <ScrollView>
        {/* jobs count */}
        <View
          style={{
            paddingVertical: 7,
            paddingLeft: 20,
            borderBottomColor: "#c1c1c1",
            borderBottomWidth: 1,
          }}
        >
          <AppText title="10 jobs available" size={16} />
        </View>
        {/* jobs count */}
        
        {/* job list start */}
        <View style={{ marginBottom: 30, flex: 1 }}>
          {jobs.map((job, index) => {
            return <JobBox job={job} key={index} onPress={gotoJobDetail} />;
          })}
        </View>
        {/* job list start */}
      </ScrollView>
    </ContainerFluid>
  );
}

const styles = StyleSheet.create({});

export default Home;
