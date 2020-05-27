import React, { useState } from "react";
import { View, StyleSheet, Button, RefreshControl } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

function Home({ navigation, route }) {
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

  //navigate to job detail 
  const gotoJobDetail = (job) => {
    navigation.navigate("HomeTab", {
      screen: "JobDetail",
      params: {
        job
      },
    });
  };

  //search jobs on getting params back from search screen
   React.useEffect(() => {
      if (
        (route.params?.title || route.params?.category ||
        route.params?.type ||
        route.params?.level )
      ) {
         setJobs((prevJobs) => {
           prevJobs.shift();
           return prevJobs;
         });
      }
   }, [route.params?.title, route.params?.category, route.params?.type, route.params?.level]);


  //handle refresh functionality
  const [refreshing, setRefreshing] = React.useState(false);

  function fetchJobs(timeout) {
    return new Promise((resolve) => {
      setJobs((prevJobs) => {
         prevJobs.shift();
        return prevJobs;
      });
       return resolve('dsfas');
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchJobs().then(() => setRefreshing(false));
  }, [refreshing]);


  return (
    <ContainerFluid>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red', 'blue']} /> }>
         {/* login */}
         <Button title='login'
         onPress={()=>
           
             navigation.navigate('ProfileTab',{screen:'Login'})
           
         }
          />
          <View style={{color:'red',borderColor:'red',borderWidth:1}}>
             <Button  title='Register'
         onPress={()=>
           
             navigation.navigate('ProfileTab',{screen:'Register'})
           
         }
          />
          </View>
        {/* jobs count */}
        <View
          style={{
            paddingVertical: 7,
            paddingLeft: 20,
            borderBottomColor: "#c1c1c1",
            borderBottomWidth: 1,
          }}
        >
          <AppText title={`${jobs.length} jobs available`} size={16} />
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


export default Home;
