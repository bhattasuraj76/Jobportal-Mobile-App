import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { ScrollView } from "react-native-gesture-handler";

function Home({ navigation }) {

  const [jobs, setJobs] = useState([
    {
      title: "ABC Company",
      company_name: "ABC Company",
      address: "Samakhusi, Kathmandu",
      salary: "Rs. 20,000",
      level: "Mid Level",
      deadline: "2 weeks from now",
    },
    {
      title: "ABC Company",
      company_name: "ABC Company",
      address: "Samakhusi, Kathmandu",
      salary: "Rs. 20,000",
      level: "Mid Level",
      deadline: "2 weeks from now",
    },
    {
      title: "ABC Company",
      company_name: "ABC Company",
      address: "Samakhusi, Kathmandu",
      salary: "Rs. 20,000",
      level: "Mid Level",
      deadline: "2 weeks from now",
    },
    {
      title: "ABC Company",
      company_name: "ABC Company",
      address: "Samakhusi, Kathmandu",
      salary: "Rs. 20,000",
      level: "Mid Level",
      deadline: "2 weeks from now",
    },
    {
      title: "ABC Company",
      company_name: "ABC Company",
      address: "Samakhusi, Kathmandu",
      salary: "Rs. 20,000",
      level: "Mid Level",
      deadline: "2 weeks from now",
    },
  ]);
  return (
    <ContainerFluid>
      <ScrollView>
        <View style={{ paddingVertical: 7, paddingLeft: 20 }}>
          <AppText title="10 jobs available" />
        </View>
        {jobs.map((job, index) => {
          return <JobBox job={job} key={index} />;
        })}
      </ScrollView>
    </ContainerFluid>
  );
}

const styles = StyleSheet.create({

});

export default Home;
