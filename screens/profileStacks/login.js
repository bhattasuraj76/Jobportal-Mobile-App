import React, { useContext } from "react";
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

  const handleLogin = (values, actions) => {
    const { email, password } = values;

    const resp = 1; //response form server
    if (resp == 1) {
      //reset form
      actions.resetForm();
      //update authUser value
      setAuthStatus({
        email: "xyz@gmail.com",
        token: "fsadklasdjlfa",
      });
      //navigate to profile
      navigation.navigate("ProfileTab", {
        screen: "Profile",
      });
    } else {
      alert("Invalid email or password");
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
                isSubmitting,
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
                      disabled={isSubmitting}
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
