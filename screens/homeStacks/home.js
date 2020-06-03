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

  //fetch jobs
  const fetchJobs = async () => {
    try {
      let data = await Axios.get(`${apiPath}/mobile-app-home`).then(
        (res) => res.data
      );
      if (data.resp == 1) return data.jobs;
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

  //fetch jobs on screen foucus
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchJobs()
        .then(jobs => {
          if (isActive && jobs) setJobs(jobs);
        })
        .catch(err => console.log(err))
        .then(() => setIsLoading(false));

      return () => {
        isActive = false;
      };
    }, [])
  );

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
    route.params?.level,
  ]);

  //handle refresh and refetch jobs
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchJobs().then((jobs) => {
      if (jobs) setJobs(jobs);
      setRefreshing(false);
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
