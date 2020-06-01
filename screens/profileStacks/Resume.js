import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DefaultThemeColors } from "../../utils/constants/Colors";
import Icon from "../../shared/icon";
import AppText from "../../shared/appText";
import ResumeCover from "../../assets/img/file-upload.jpg";
import * as DocumentPicker from "expo-document-picker";

function Resume() {
  const [hasUserResume, setHasUserResume] = useState(false);

  const uploadCV = () => {
    const pickDocument = new Promise(async (res, rej) => {
      try {
        let result = await DocumentPicker.getDocumentAsync({});
        return res(result);
      } catch (err) {
        return rej(err);
      }
    });

    pickDocument
      .then((res) => {
        setHasUserResume(!hasUserResume);
        console.log(res);
      })
      .catch((err) => console.log(err));

    // _pickDocument()
    //   .then((response) => {
    //      console.log(response);
    //     if(response.type == "success"){
    //         console.log("File uploaded", response);
    //         setHasUserResume(!hasUserResume);
    //     }
    //   })
    //   .catch((err) => console.log('aaa', err));
  };

  const _pickDocument = async () => {};

  return (
    <ContainerFluid>
      <ImageBackground
        source={ResumeCover}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.08, resizeMode: "cover" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
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
          <TouchableOpacity onPress={() => uploadCV()}>
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
