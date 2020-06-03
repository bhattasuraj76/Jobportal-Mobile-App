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
        if (user && user.token) {
          //update authUser value
          setAuthStatus({
            email: user.email,
            token: user.token,
          }).then(() => {
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
         //reset form
          actions.resetForm();
      });
  };

  //aync login user
  const _loginUser = async (data) => {
    let url = `${apiPath}/login`;

    try {
      const result = await Axios.post(url, data).then((res) => res.data);
      if (result.resp == 1) return result.user;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request cancelled");
      } else if (err.response) {
        console.log(err.response.data);
        if (err.response.data.resp == 0)
          showError(serializeErrors({error : err.response.data.message}))
        else showError(serializeErrors(err.response.data))
      } else {
        console.log(err);
      }
    }
  };

  return (
    <ContainerFluid>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingVertical: 30,
              backgroundColor: isThemeDark ? "#000" : "#36485f",
              justifyContent: "center",
            }}
          >
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
