import React, { useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect } from "@react-navigation/native";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";
import Loader from "../../shared/loader";

function Home({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false); 
  

  //async fetch jobs
  const _fetchJobs = async () => {
    try {
      let data = await Axios.get(`${apiPath}/mobile-app-home`).then(
        (res) => res.data
      );
      if (data.resp == 1) return data.jobs;
    } catch (err) {
      console.error(err);
    }
  };

  //async search jobs
  const _searchJobs = async (data) => {
    try {
      let  url =`${apiPath}/search`
      console.log(data);
      let response = await Axios.post(url, data).then(
       
        (res) => res.data
        
      );
      console.log(response);
      
      if (response.resp == 1) return response.jobs.data;
    } catch (err) {
      console.error(err);
    }
  };

  //navigate to job detail
  const gotoJobDetail = (jobSlug) => {
    navigation.navigate("HomeTab", {
      screen: "JobDetail",
      params: {
        jobSlug,
      },
    });
  };
  //use effect

  React.useEffect(()=>{
  console.log(route);
  if (route.params){
    
    let keyword=route.params.title;
    let category=route.params.category?[route.params.category]:null;
    let type=route.params.type?[route.params.type]:null;
    let level=route.params.level?[route.params.level]:null;
    // console.log(title,category,type, level);
    if(!keyword && !category && !type && !level)
    return;

    // console.log(title,category,type, level);
    setIsSearching(true);
    _searchJobs({
      keyword, category,type,level
    }).then(jobs=>{
      if (jobs) setJobs(jobs);
      console.log(jobs);
    }).catch(err=>{
      console.log(err);
    });

  }
  // return()=>{
  //   setIsSearching(false);

  // }
  


  },[route])

  // fetch jobs on screen foucus
  useFocusEffect(
    React.useCallback(() => {
     if(isSearching)return;
      let isActive = true;

      _fetchJobs()
        .then(jobs => {
          console.log('x');
          if (isActive && jobs) setJobs(jobs);
        })
        .catch(err => console.log(err))
        .then(() => setIsLoading(false));

      return () => {
        isActive = false;
      };
    }, [isSearching])
  );

  
  

  //handle refresh and refetch jobs
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    _fetchJobs().then((jobs) => {
      if (jobs) setJobs(jobs);
      setRefreshing(false);
      setIsSearching(false);
    });
  }, [refreshing]);

  return (
    <ContainerFluid>
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          // job list
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <JobBox job={item} onPress={gotoJobDetail} />
            )}
            ListHeaderComponent={() => (
              <View style={styles.jobsCountWrap}>
                <AppText size={16}>{jobs.length} jobs available</AppText>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red", "blue"]}
              />
            }
          />
          // job list
        )}
      </View>
    </ContainerFluid>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    flex: 1,
  },
  jobsCountWrap: {
    paddingVertical: 7,
    paddingLeft: 20,
    borderBottomColor: "#c1c1c1",
    borderBottomWidth: 1,
  },
});
export default Home;
