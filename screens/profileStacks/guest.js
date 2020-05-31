import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { globalStyles} from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import { TouchableOpacity } from "react-native-gesture-handler";

function Guest({ navigation }) {
  const gotoLogin = () => {
    navigation.navigate("ProfileTab", { screen: "Login" });
  };

  const gotoRegister = () => {
    navigation.navigate("ProfileTab", { screen: "Register" });
  };

  return (
    <View style={styles.guestWrapper}>
      <View>
        <AppText size={18}>Please sign in to view your profile</AppText>
        <View style={globalStyles.rowCenterCenter}>
          <TouchableOpacity onPress={() => gotoLogin()}>
            <AppText size={20} family="semi-bold" color="info">
              Log In
            </AppText>
          </TouchableOpacity>

          <Text
            style={{
              marginHorizontal: 10,
            }}
          >
            <AppText size={18}>or</AppText>
          </Text>

          <TouchableOpacity onPress={() => gotoRegister()}>
            <AppText size={20} family="semi-bold" color="info">
              Register
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  guestWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Guest;
