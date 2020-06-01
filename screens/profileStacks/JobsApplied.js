import React, { useState } from "react";
import { View, ScrollView, FlatList, RefreshControl } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect } from "@react-navigation/native";
import JobAppliedBox from "../../shared/jobAppliedBox";

function JobsApplied({ navigation, route }) {
  const [jobs, setJobs] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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

  //navigate to job detail
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
      <View style={{ marginBottom: 30 }}>
        {/* job list start */}

        <FlatList
          nestedScrollEnabled
          keyExtractor={(item) => item.id.toString()}
          data={jobs}
          renderItem={({ item }) => (
            <JobAppliedBox job={item} onPress={gotoJobDetail} />
          )}
        />

        {/* job list start */}
      </View>
    </ContainerFluid>
  );
}

export default JobsApplied;
