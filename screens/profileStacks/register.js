import React, { useContext } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import JobApplyBtn from "../../shared/appBtn";
import ContainerFluid from "../../shared/containerFluid";
import FormGroup from "../../shared/formGroup";
import { ThemeContext } from "../../contexts/ThemeContext";

function Login({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
     navigation.navigate("ProfileTab", {
       screen: "Profile",
     });
  };

  return (
    <ContainerFluid>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
            backgroundColor: isThemeDark ? "#000" : "#36485f",
            justifyContent: "center",
          }}
        >
          <FormGroup>
            <TextInput
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
              placeholder={"First Name"}
              style={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              value={lastName}
              onChangeText={(value) => setLastName(value)}
              placeholder={"Last Name"}
              style={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder={"Email"}
              style={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              value={password}
              onChangeText={(password) => setPassword(password)}
              placeholder={"Password"}
              secureTextEntry={true}
              style={styles.input}
            />
          </FormGroup>

          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <JobApplyBtn title="Register" onPress={handleRegister} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ContainerFluid>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 20,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    fontSize: 18,
  },
});

export default Login;
