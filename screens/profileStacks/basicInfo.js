import React, { useContext, useState, useRef, createRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import ErrorText from "../../shared/errorText";
import ContainerFluid from "../../shared/containerFluid";
import FormGroup from "../../shared/formGroup";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Formik } from "formik";
import * as yup from "yup";
import InputLevel from "../../shared/inputLevel";
import HeaderRightActionBtn from "../../shared/headerRightActionBtn";
import Checkbox from "../../shared/checkbox";
import BasicFormInput from "../../shared/basicFormInput";
import { globalStyles } from "../../styles/globalStyles";
import Axios from "axios";
import { serializeErrors } from "../../utils/Helpers";
import { apiPath } from "../../utils/constants/Consts";
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
import { useFocusEffect } from "@react-navigation/native";
import VerticalDivider from "../../shared/verticalDivider";
import ErrorMessage from "../../shared/errorMessage";

//register validation schema
const basicInfoSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().nullable(),
  phone: yup.string().nullable(),
  bio: yup.string().nullable(),
});

const gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "other" },
];

function BasicInfo({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { updateAuthUserName } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const { error, showError } = useErrorHandler(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //creates refrence to formik element
  const formikElement = createRef(null);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: "",
    description: "",
  });

  //customize header right buttons right before componenet mount to perfom form actons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20, flexDirection: "row" }}>
          {!isEditing ? (
            <HeaderRightActionBtn
              title="Edit"
              onPress={() => setIsEditing(true)}
            />
          ) : (
            <>
              {isSubmitting ? (
                <>
                  <ActivityIndicator size={25} color="#fff" />
                </>
              ) : (
                <>
                  <HeaderRightActionBtn
                    title="Cancel"
                    onPress={() => setIsEditing(!isEditing)}
                  />
                  <VerticalDivider />
                  <HeaderRightActionBtn
                    title="Save"
                    onPress={() => formikElement.current.handleSubmit()}
                  />
                </>
              )}
            </>
          )}
        </View>
      ),
    });
  }, [navigation, isEditing, isSubmitting, formikElement]);

  //fetch user data upon screen foucus
  useFocusEffect(
    React.useCallback(() => {
      //async fetch user data
      const _fetchUserData = async () => {
        try {
          let url = `${apiPath}/jobseeker/edit-profile`;
          let response = await Axios.get(url).then((res) => res.data);
          if (response.resp == 1) return response.user;
        } catch (err) {
          console.log("Error", err);
        }
      };

      _fetchUserData()
        .then((user) => {
          if (!user) return;
          const {
            first_name = "",
            last_name = "",
            phone = "",
            address = "",
            gender = "",
            description = "",
          } = user;

          setUser({
            firstName: first_name,
            lastName: last_name,
            phone,
            address,
            gender,
            description,
          });
        })
        .catch((err) => console.log(err));
    }, [])
  );

  //handle profile update
  const handleProfileUpdate = (values, actions) => {
    setIsSubmitting(true);
    const { firstName, lastName, address, phone, gender, description } = values;

    const userData = {
      first_name: firstName,
      last_name: lastName,
      address,
      phone,
      gender,
      description,
    };

    //perform api call to update password
    _saveBasicInfo(userData)
      .then((user) => {
        if (!user) return;
        updateAuthUserName(`${firstName} ${lastName}`).then(() => {
          setUser(values);
          alert("Successfully updated");
        });
      })
      .catch((err) => console.log(err))
      .then(() => setIsSubmitting(false));
  };

  //save user data
  const _saveBasicInfo = async (data) => {
    try {
      let url = `${apiPath}/jobseeker/edit-profile`;
      let response = await Axios.post(url, data).then((res) => res.data);
      console.log(response);
      if (response.resp == 1) return response.user;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request Cancelled", err);
      } else if (err.response) {
        if (err.response.status == 422)
          showError(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          showError(serializeErrors({ error: err.response.data.message }));
        else
          showError(serializeErrors({ error: "Failed to update basic info" }));
      } else {
        console.log("Error", err);
      }
    }
  };

  //update gender formik value
  const updateGender = (handleChange, value) => {
    handleChange(value);
  };

  return (
    <ContainerFluid>
      <ScrollView contentContainerStyle={globalStyles.flexGrow}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.basicInfoWrapper}>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Formik
              enableReinitialize
              initialValues={{ ...user }}
              validationSchema={basicInfoSchema}
              onSubmit={(values, actions) => {
                handleProfileUpdate(values, actions);
              }}
              innerRef={formikElement}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <>
                  <FormGroup>
                    <InputLevel>First Name</InputLevel>
                    <BasicFormInput
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder={"First Name"}
                      isEditing={isEditing}
                    />
                    {touched.firstName && errors.firstName ? (
                      <ErrorText>{errors.firstName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <InputLevel>Last Name</InputLevel>
                    <BasicFormInput
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                      isEditing={isEditing}
                    />
                    {touched.lastName && errors.lastName ? (
                      <ErrorText>{errors.lastName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <InputLevel>Phone</InputLevel>
                    <BasicFormInput
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder={"phone"}
                      isEditing={isEditing}
                    />
                    {touched.phone && errors.phone ? (
                      <ErrorText>{errors.phone}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <InputLevel>Address</InputLevel>
                    <BasicFormInput
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      placeholder={"Address"}
                      isEditing={isEditing}
                    />
                    {touched.address && errors.address ? (
                      <ErrorText>{errors.address}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <View>
                      <InputLevel>Gender</InputLevel>
                      {isEditing ? (
                        <Checkbox
                          radio_props={gender}
                          initial={0}
                          onPress={(value) => {
                            updateGender(handleChange("gender"), value);
                          }}
                        />
                      ) : (
                        <BasicFormInput
                          value={values.gender ? values.gender : ""}
                          placeholder={"About yourself"}
                          isEditing={false}
                        />
                      )}
                    </View>
                  </FormGroup>

                  <FormGroup>
                    <InputLevel>Bio</InputLevel>
                    <BasicFormInput
                      multiline
                      minHeight={100}
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      placeholder={"About yourself"}
                      isEditing={isEditing}
                    />
                    {touched.description && errors.description ? (
                      <ErrorText>{errors.description}</ErrorText>
                    ) : null}
                  </FormGroup>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerFluid>
  );
}

export default BasicInfo;

const styles = StyleSheet.create({
  basicInfoWrapper: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
  },
});
