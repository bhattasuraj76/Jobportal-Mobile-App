import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import AppBtn from "../../shared/appBtn";
import ErrorText from "../../shared/errorText";
import ContainerFluid from "../../shared/containerFluid";
import FormGroup from "../../shared/formGroup";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../shared/input";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../shared/icon";

//register validation schema
const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Password is required"),
  phone: yup.string().required("Password is required"),
  gender: yup.string().required("Password is required"),
});

function BasicInfo({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { authUser, setAuthStatus } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const editBasicInfo = () => {
    console.log("fasd");
  };

  const resetBasicInfo = () => {
    setIsEditing(false);

    console.log("fasd");
  };

  const updateBasicInfo = (values, actions) => {
    const { firstName, lastName, gender, address, phone, description } = values;

    const resp = 1; //response form server
    if (resp == 1) {
      //reset form
      actions.resetForm();
      //alert user
      alert("Updated Basic Info Successfully");
    } else {
      alert("Update Failed");
    }
  };

  return (
    <ContainerFluid>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: isThemeDark ? "#000" : "#fff",
              justifyContent: "center",
            }}
          >
            <Formik
              initialValues={{
                firstName: "dafa",
                lastName: "fasf",
                phone: "fsaddfasd",
                address: "fasdfa",
                gender: "fdsafa",
                description: "fsdafas",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                handleRegister(values, actions);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 20,
                      paddingHorizontal: 10,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>Personal Details</Text>

                    {!isEditing ? (
                      <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Icon name="edit" size={28} color="blue" />
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity onPress={() => resetBasicInfo()}>
                          <Icon name="edit" size={28} color="blue" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => updateBasicInfo()}>
                          <Icon name="edit" size={28} color="blue" />
                        </TouchableOpacity>
                      </>
                    )}

                    {/* 
                    <AppBtn
                      title="Register"
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    /> */}
                  </View>

                  <FormGroup>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder={"First Name"}
                      editable={isEditing ? true : false}
                    />
                    {touched.firstName && errors.firstName ? (
                      <ErrorText>{errors.firstName}</ErrorText>
                    ) : null}
                  </FormGroup>
                  {/* 
                  <FormGroup>
                    <TextInput
                      style={styles.input}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                    />
                    {touched.lastName && errors.lastName ? (
                      <ErrorText>{errors.lastName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      style={styles.input}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                    />
                    {touched.lastName && errors.lastName ? (
                      <ErrorText>{errors.lastName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      style={styles.input}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      placeholder={"Address"}
                    />
                    {touched.address && errors.address ? (
                      <ErrorText>{errors.address}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      style={styles.input}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder={"Phone"}
                    />
                    {touched.phone && errors.phone ? (
                      <ErrorText>{errors.phone}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      style={styles.input}
                      multiline
                      minHeight={100}
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      placeholder={"About yourself"}
                    />
                    {touched.description && errors.description ? (
                      <ErrorText>{errors.description}</ErrorText>
                    ) : null}
                  </FormGroup> */}

                  {/* <FormGroup>
                    <Input
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                    />
                    {touched.email && errors.email ? (
                      <ErrorText>{errors.email}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder={"Email"}
                    />
                    {touched.email && errors.email ? (
                      <ErrorText>{errors.email}</ErrorText>
                    ) : null}
                  </FormGroup> */}

                  {/* <FormGroup>
                    <Input
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder={"Password"}
                      secureTextEntry={true}
                    />
                    {touched.password && errors.password ? (
                      <ErrorText>{errors.password}</ErrorText>
                    ) : null}
                  </FormGroup> */}
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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  inputNoEditable: {
                          backgroundColor: "#ccc",
                          borderWidth: 0,
                        }
});
