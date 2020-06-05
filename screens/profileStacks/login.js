import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
import ErrorMessage from "../../shared/errorMessage";
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
import { serializeErrors } from "../../utils/Helpers";
import { apiPath } from "../../utils/constants/Consts";
import Axios from "axios";
import { globalStyles } from "../../styles/globalStyles";

//login validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: yup.string().required("Password is required"),
});

function Login({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { setAuthStatus } = useContext(AuthContext);
  const { error, showError } = useErrorHandler(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handle user login form submit
  const handleLogin = (values, actions) => {
    setIsSubmitting(true);
    const { email, password } = values;

    _loginUser({ email, password, entity: "jobseeker" })
      .then((user) => {
        console.log(user);
        //update authUser value provided user and user token
        if (user && user.token) {
          const { email, name, profile, token, cv } = user;

          setAuthStatus({
            email,
            name,
            profile,
            token,
            hasCV: cv ? true : false
          }).then(() => {
            //reset form
            actions.resetForm();
            //navigate to profile
            navigation.navigate("ProfileTab", {
              screen: "Profile",
            });
          });
        }
      })
      .catch((err) => console.log("Error"))
      .then(() => {
        setIsSubmitting(false);
      });
  };

  //aync login user
  const _loginUser = async (data) => {
    try {
      let url = `${apiPath}/login`;
      const result = await Axios.post(url, data).then((res) => res.data);
      if (result.resp == 1) return result.user;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request cancelled");
      } else if (err.response) {
        if (err.response.status == 422)
          showError(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          showError(serializeErrors({ error: err.response.data.message }));
        else showError(serializeErrors({ error: "Failed to login" }));
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
                password: "",
                email: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                handleLogin(values, actions);
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

                  <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <AppBtn
                      title="Login"
                      onPress={handleSubmit}
                      disabled={false}
                    />
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

export default Login;
