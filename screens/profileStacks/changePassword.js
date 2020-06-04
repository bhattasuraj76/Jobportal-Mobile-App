import React, { useContext, useState } from "react";
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
import { globalStyles } from "../../styles/globalStyles";
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
import ErrorMessage from "../../shared/errorMessage";
import Axios from "axios";
import { apiPath } from "../../utils/constants/Consts";
import { serializeErrors } from "../../utils/Helpers";

//change password validation schema
const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old Password is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum of 6 charaters"),
  confirmPassword: yup
    .string()
    .required("Confimation Password is required")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

function ChangePassword({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { error, showError } = useErrorHandler(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (values, actions) => {
    setIsSubmitting(true);
    const { password, confirmPassword, oldPassword } = values;

    //perform api call to update password
    _changePassword({
      password,
      password_confirmation: confirmPassword,
      old_password: oldPassword,
    })
      .then((message) => {
        if (message) alert(message);
      })
      .catch((err) => console.log(err))
      .then(() => setIsSubmitting(false));
  };

  const _changePassword = async (data) => {
    try {
      let url = `${apiPath}/change-password`;
      let response = await Axios.post(url, data).then((res) => res.data);
      if (response.resp == 1) return response.message;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("Request Cancelled", err);
      } else if (err.response) {
        if (err.response.status == 422)
          showError(serializeErrors(err.response.data));
        else if (err.response.data.resp == 0)
          showError(serializeErrors({ error: err.response.data.message }));
        else showError(serializeErrors({ error: "Failed to change password" }));
      } else {
        console.log("Error", err);
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
            {error && <ErrorMessage>{error} </ErrorMessage>}

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
                      placeholder={"New Password"}
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
