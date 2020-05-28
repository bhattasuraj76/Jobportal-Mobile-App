import React, { useContext } from "react";
import {
  TextInput,
  View,
  StyleSheet,
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
import { AuthContext } from "../../contexts/AuthContext";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../shared/input";

//change password validation schema
const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old Password is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confimation Password is required")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

function ChangePassword({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);

  const handlePasswordChange = (values, actions) => {
    const { password, confirmPassword, oldPassword } = values;

    //perform api call to update password
    new Promise((r) => setTimeout(r, 2000))
      .then((val) => {
                       const resp = 1; //response form server
                       if (resp === 1) {
                         actions.resetForm();
                         alert("Password changed successfully");
                       }
                     })
      .catch((err) => console.log(err));
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
                oldPassword: "",
                confirmPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={(values, actions) => {
                handlePasswordChange(values, actions);
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
                      value={values.oldPassword}
                      onChangeText={handleChange("oldPassword")}
                      onBlur={handleBlur("oldPassword")}
                      placeholder={"Old Password"}
                    />
                    {touched.oldPassword && errors.oldPassword ? (
                      <ErrorText>{errors.oldPassword}</ErrorText>
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
                    <AppBtn
                      title="Change Password"
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

export default ChangePassword;
