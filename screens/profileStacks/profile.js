import React, { useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import Guest from "./guest";
import User from "./user";

function Profile({ navigation }) {
  const { authUser, setUnauthStatus } = useContext(AuthContext);

  const isUserLoggedIn = authUser.token ?  true : false;

  return (
    <View style={{ flex: 1 }}>
      {isUserLoggedIn ? (
        <User navigation={navigation} />
      ) : (
        <Guest navigation={navigation} />
      )}
    </View>
  );
}

export default Profile;
