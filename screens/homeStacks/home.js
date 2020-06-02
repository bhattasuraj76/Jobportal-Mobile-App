import React, { useState } from "react";
import { View, ScrollView, FlatList, RefreshControl } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect } from "@react-navigation/native";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";

function Home({ navigation, route }) {
  const [jobs, setJobs] = useState([]);

  //fetch jobs
  const fetchJobs = async () => {
    try {
      let data = await Axios.get(`${apiPath}/mobile-app-home`).then(res => res.data);
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
        .then((jobs) => {
          if (isActive && jobs) setJobs(jobs);
        })

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
