import React, { useState } from "react";
import { View, ScrollView, FlatList , RefreshControl } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect } from "@react-navigation/native";

function Home({ navigation, route }) {
  const [jobs, setJobs] = useState([
   
    
  ]);
  
  useFocusEffect(
    React.useCallback(() => {
      let isActive=true;
      const fetchJob=async()=>{
    
        try {
          let response =await  fetch(
          'http://jpapi.vertexwebsurf.com/api/mobile-app-home'
          );
          let responseJson = await response.json();
          if (isActive){
            setJobs(responseJson.jobs);
            console.log(responseJson);
          }
          
          } catch (error) {
          console.error(error);
          }
        
      }
     fetchJob();
     console.log('ll');
     
     return()=>{
       isActive=false;
     }

     
    },[])
    
  );
  //navigate to job detail
  const gotoJobDetail = (jobsLug) => {
    navigation.navigate("HomeTab", {
      screen: "JobDetail",
      params: {
        jobsLug
      },
    });
  };

  //search jobs on getting params back from search screen
  React.useEffect(() => {
    if (
      route.params?.title ||
      route.params?.category ||
      route.params?.type ||
      route.params?.level
    ) {
      setJobs((prevJobs) => {
        prevJobs.shift();
        return prevJobs;
      });
    }
  }, [
    route.params?.title,
    route.params?.category,
    route.params?.type,
    route.params?.level
  ]);

  //handle refresh functionality
  const [refreshing, setRefreshing] = React.useState(false);

  function fetchJobs(timeout) {
    return new Promise((resolve) => {
      setJobs((prevJobs) => {
        prevJobs.shift();
        return prevJobs;
      });
      return resolve("dsfas");
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // fetchJobs().then(() => setRefreshing(false));

    let isActive=true;
    const fetchJob=async()=>{
  
      try {
        let response =await  fetch(
        'http://jpapi.vertexwebsurf.com/api/mobile-app-home'
        );
        let responseJson = await response.json();
        
          
            if (isActive){
            setJobs(responseJson.jobs);
          setRefreshing(false);
          console.log(responseJson);
            }
          }
          
        
        
         catch (error) {
        console.error(error);
        }
      
    }
   fetchJob();
   console.log('ll');
   
   return()=>{
     isActive=false;
     console.log('active status');
   }
  },[refreshing]);


  return (
    <ContainerFluid>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["red", "blue"]}
          />
        }
      >
        {/* login */}
        {/* <Button
          title="login"
          onPress={() => navigation.navigate("ProfileTab", { screen: "Login" })}
        />
        <View style={{ color: "red", borderColor: "red", borderWidth: 1 }}>
          <Button
            title="Register"
            onPress={() =>
              navigation.navigate("ProfileTab", { screen: "Register" })
            }
          />
        </View> */}

        {/* jobs count */}
        <View
          style={{
            paddingVertical: 7,
            paddingLeft: 20,
            borderBottomColor: "#c1c1c1",
            borderBottomWidth: 1,
          }}
        >
          <AppText size={16}>{jobs.length} jobs available</AppText>
        </View>
        {/* jobs count */}

        {/* job list start */}
        <View style={{ marginBottom: 30 }}>
          <FlatList
            nestedScrollEnabled
            keyExtractor={(item) => item.id.toString()}
            data={jobs}
            renderItem={({ item }) => (
              <JobBox job={item} onPress={gotoJobDetail} />
            )}
          />
        </View>
        {/* job list start */}
      </ScrollView>
    </ContainerFluid>
  );
}

export default Home;
