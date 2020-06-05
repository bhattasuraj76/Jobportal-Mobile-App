import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DefaultThemeColors } from "../../utils/constants/Colors";
import Icon from "../../shared/icon";
import AppText from "../../shared/appText";
import ResumeCover from "../../assets/img/file-upload.jpg";
import * as DocumentPicker from "expo-document-picker";
import { apiPath } from "../../utils/constants/Consts";
import Axios from "axios";
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
import { globalStyles } from "../../styles/globalStyles";
import ErrorMessage from "../../shared/errorMessage";
import { serializeErrors } from "../../utils/Helpers";

function Resume() {
  const [hasUserResume, setHasUserResume] = useState(false);
  const {error, showError} = useErrorHandler(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //async pcik document
  const _pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if(result.type == "success" ) return result;
    } catch (err) {
      console.log(err);
    }
  };

  //handle cv submit
  const handleCVSubmit =  () => {
    setIsSubmitting(true);

    _pickDocument()
      .then((document) => {
        console.log(document);
        if(!document) return;
        
        //create object with uri, type, image name
        var file = {
          uri: document.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        };

        file = JSON.stringify(file);

        // //use formdata
        var formData = new FormData();
        formData.append("cv", file);
        // console.log(formData);

        _uplaodCV(formData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error.response);
          });
        
      })
      .catch((err) => console.log(err));
  };

  //async upload cv using axios
  const _uplaodCV = async (formData) => {
    try {
      const options = {
        method: "POST",
        url: `${apiPath}/jobseeker/edit-profile`,
        data: formData,
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
    
      const response = await Axios(options).then((res) => res.data);
      console.log(response);
      // if (response.resp == 1) return resp.message;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request cancelled");
      } else if (err.response) {
        if (err.response.status == 422)
          showError(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          showError(serializeErrors({ error: err.response.data.message }));
        else showError(serializeErrors({ error: "Failed to register" }));
      } else {
        console.log(err);
      }
    }
  };

  return (
    <ContainerFluid>
      <ImageBackground
        source={ResumeCover}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.08, resizeMode: "cover" }}
      >
        <View
          style={globalStyles.contentWrapperCenter}
        >

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* header */}
          <View style={styles.title}>
            {hasUserResume ? (
              <TouchableOpacity>
                <View style={styles.downloadWrap}>
                  <Icon
                    name="file-download"
                    color={DefaultThemeColors.headerBg}
                    size={32}
                  />

                  <Text
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <AppText size={25} color="info">
                      Download Resume
                    </AppText>
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <AppText size={25}>No Resume</AppText>
            )}
          </View>
          {/* header */}

          {/* helper text */}
          <View style={styles.info}>
            <Text style={styles.helperText}>
              <AppText size={16} color="secondary">
                {hasUserResume ? (
                  <Text>Click the button below to upload your new resume.</Text>
                ) : (
                  <Text>
                    You have not uploaded your resume. Click the button below to
                    upload your resume.
                  </Text>
                )}
              </AppText>
            </Text>
          </View>
          {/* helper text */}

          {/* file upload btn */}
          <TouchableOpacity onPress={() => handleCVSubmit()} disabled={isSubmitting}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Upload</Text>
            </View>
          </TouchableOpacity>
          {/* file upload btn */}
        </View>
      </ImageBackground>
    </ContainerFluid>
  );
}

export default Resume;

const styles = StyleSheet.create({
  title: { marginBottom: 10 },
  downloadWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { marginBottom: 30, marginHorizontal: 40 },
  helperText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: DefaultThemeColors.headerBg,
    borderRadius: 4,
  },
  btnText: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "#fff",
    textAlign: "center",
  },
});
