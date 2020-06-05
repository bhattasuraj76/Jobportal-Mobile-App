import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
} from "react-native";
import AppBtn from "../../shared/appBtn";
import ErrorText from "../../shared/errorText";
import ContainerFluid from "../../shared/containerFluid";
import FormGroup from "../../shared/formGroup";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../shared/input";
import ErrorMessage from "../../shared/errorMessage";
import { apiPath } from "../../utils/constants/Consts";
import Axios from "axios";
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
import { serializeErrors } from "../../utils/Helpers";
import { globalStyles } from "../../styles/globalStyles";

//register validation schema
const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum of 6 charaters"),
  confirmPassword: yup
    .string()
    .required("Confimation Password is required")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

function Register({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { error, showError } = useErrorHandler(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handle user register form submit
  const handleRegister = (values, actions) => {
    setIsSubmitting(true);
    const { firstName, lastName, email, password, confirmPassword } = values;

    const userRegisterData = {
      entity: "jobseeker",
      name: "",
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: confirmPassword,
    };
   
    _regitserUser(userRegisterData)
      .then((res) => {
        //show success message
        if (res) alert(res);
        //reset form
        actions.resetForm();
      })
      .catch(err => console.log(err))
      .then(() => {
        setIsSubmitting(false);
      });
  };

  //async register user
  const _regitserUser = async (data) => {
    let url = `${apiPath}/userRegister`;

    try {
      const result = await Axios.post(url, data).then((res) => res.data);
      if (result.resp == 1) return result.message;
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
      <ScrollView contentContainerStyle={globalStyles.flexGrow}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              ...globalStyles.authForm,
              backgroundColor: isThemeDark ? "#000" : "#36485f",
            }}
          >
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                confirmPassword: "",
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
              }) => (
                <>
                  <FormGroup>
                    <Input
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder={"First Name"}
                    />
                    {touched.firstName && errors.firstName ? (
                      <ErrorText>{errors.firstName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Input
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
                    <Input
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder={"Email"}
                    />
                    {touched.email && errors.email ? (
                      <ErrorText>{errors.email}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
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
                  </FormGroup>

                  <FormGroup>
                    <Input
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      placeholder={"Confirm Password"}
                      secureTextEntry={true}
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <ErrorText>{errors.confirmPassword}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <AppBtn title="Register" onPress={handleSubmit} disabled={isSubmitting}/>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerFluid>
  );
}

export default Register;
