import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DefaultThemeColors } from "../../utils/constants/Colors";
import Icon from "../../shared/icon";
import AppText from "../../shared/appText";
import ResumeCover from "../../assets/img/file-upload.jpg";
import * as DocumentPicker from "expo-document-picker";
import { apiPath } from "../../utils/constants/Consts";
import Axios from "axios";
import { globalStyles } from "../../styles/globalStyles";
import { serializeErrors } from "../../utils/Helpers";
import { AuthContext } from "../../contexts/AuthContext";

function Resume() {
  const {authUser, updateAuthUserCVStatus} = useContext(AuthContext);
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
        if(!document) return;

        //show loader
        setIsSubmitting(true);
        
        //create object with uri, type, fiile name
        var file = {
          uri: document.uri,
          type: "application/pdf",
          name: "cv.pdf",
        };

        // //use formdata
        var formData = new FormData();
        formData.append("cv", file);

        _uplaodCV(formData)
          .then(user =>  {
            console.log(user);
            if(!user || !user.cv)  return;
              updateAuthUserCVStatus();
              alert('Resume uploaded successfully');
          })
          .catch(err => console.log(err)).then(() => setIsSubmitting(false));
        
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
      if (response.resp == 1) return response.user;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request cancelled");
      } else if (err.response) {
        if (err.response.status == 422)
          reportErrors(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          reportErrors(serializeErrors({ error: err.response.data.message }));
        else reportErrors(serializeErrors({ error: "Failed to upload CV" }));
      } else {
        console.log(err);
      }
    }
  };

  //downalod cv
  const _handleDownloadCV = async () => {
    try {
      const options = {
        method: "POST",
        url: `${apiPath}/downloadCV`,
        data: {email: authUser.email},
      };
    
      const response = await Axios(options).then((res) => res.data);
      if (!response ||response.resp == 0) throw new Error('Error');
      alert('Download successfull');
    } catch (err) {
      reportErrors('Failed to download')
    }
  }

    //report errors to user
  const reportErrors = (error) => {
    if (!error) return;
    Alert.alert(
      "Error",
      error,
      [
        { text: "OK", onPress: () => console.log("Okey") },
      ],
      { cancelable: false }
    );
  };

  return (
    <ContainerFluid>
      <ImageBackground
        source={ResumeCover}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.08, resizeMode: "cover" }}
      >
        <View style={globalStyles.contentWrapperCenter}>
          {/* header */}
          <View style={styles.title}>
            {authUser.hasCV ? (
              <TouchableOpacity onPress={() => _handleDownloadCV()}>
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
                {authUser.hasCV ? (
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
          <TouchableOpacity
            onPress={() => handleCVSubmit()}
            disabled={isSubmitting}
          >
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
