import React, { useState, useCallback } from "react";
import { View, ScrollView, FlatList, RefreshControl } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import JobBox from "../../shared/jobBox";
import AppText from "../../shared/appText";
import { useFocusEffect } from "@react-navigation/native";
import JobAppliedBox from "../../shared/jobAppliedBox";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";
import Loader from "../../shared/loader";

function JobsApplied({ navigation, route }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //navigate to job detail
  const gotoJobDetail = (jobSlug) => {
    navigation.navigate("HomeTab", {
      screen: "JobDetail",
      params: {
        jobSlug,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      let isAcitve = true;
      if (isAcitve) {
        _fetchAppliedJobs()
          .then(jobs => {
            if (jobs) setJobs(jobs);
          })
          .catch((err) => console.log(err))
          .then(() => setIsLoading(false));
      }
      return () => {
        isAcitve = false;
      };
    }, [])
  );

  const _fetchAppliedJobs = async () => {
    try {
      let url = `${apiPath}/jobseeker`;
      let response = await Axios.get(url).then((res) => res.data);
      console.log(response);
      if (response.resp == 1) return response.result.jobs;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request Cancelled", err);
      } else if (err.response) {
        console.log(err.response.data);
      } else {
        console.log("Error", err);
      }
    }
  };

  return (
    <ContainerFluid>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        {jobs.length ? (
//  job list start
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobAppliedBox job={item} onPress={gotoJobDetail} />
          )}
          contentContainerStyle={{ marginBottom: 30 }}
        />
        //  job list end
        ): (
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <AppText size={20}>No jobs applied yet</AppText>
          </View>
        )}

        </>
      )}
    </ContainerFluid>
  );
}

export default JobsApplied;
