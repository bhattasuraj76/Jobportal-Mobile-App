import React, { useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet, StatusBar } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";
import Loader from "../../shared/loader";

function Home({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

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
      let url = `${apiPath}/mobile-search`;
      let response = await Axios.post(url, data).then((res) => res.data);
      if (response.resp == 1) return response.jobs;
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

  //get params of route
  const getRouteParams = ({
    title = null,
    category = null,
    type = null,
    level = null,
  } = {}) => {
    let jobTitle = title;
    let jobCat = category && [category];
    let jobType = type && [type];
    let jobLevel = level && [level];

    return {
      keyword: jobTitle,
      category: jobCat,
      type: jobType,
      level: jobLevel,
    };
  };

  // handle screen foucus
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      let isSearching = false;

      //deconstruct route params if avaliable
      const { keyword, category, type, level } = route.params
        ? getRouteParams(route.params)
        : {};

      //if any route params defined , set isSearching true to search jobs
      isSearching = keyword || category || type || level ? true : false;

      if (isSearching) {
        //search job on route paramas available
        _searchJobs({
          keyword,
          category,
          type,
          level,
        })
          .then((jobs) => {
            if (isActive && jobs) setJobs(jobs);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //fetch jobs if params are unavailable i.e no search happens
        _fetchJobs()
          .then((jobs) => {
            if (isActive && jobs) setJobs(jobs);
          })
          .catch((err) => console.log(err))
          .then(() => setIsLoading(false));
      }

      return () => {
        isActive = false;
      };
    }, [route])
  );

  //handle refresh and refetch jobs
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // _fetchJobs().then((jobs) => {
    //   if (jobs) setJobs(jobs);
    // setRefreshing(false);
    // });

    //reset route params passed from search screen so default behaviour occurs
    //default-behaviour : refetch jobs on screen foucus
    navigation.dispatch(
      CommonActions.setParams({
        category: null,
        title: null,
        type: null,
        level: null,
      })
    );

    setRefreshing(false);
  }, [refreshing, navigation]);

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
