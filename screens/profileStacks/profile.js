import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles, images } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

function Profile() {
  const [personalDetails, setpersonalDetails] = useState(true);
  const [resume, setresume] = useState(false);
  const [password, setpassword] = useState(false);
  return (
    <ScrollView>
      <View style={{}}>
        <View
          style={{
         
            
          }}
        >
          <ImageBackground
            source={require('../../assets/img/sanj.jpg')}
            style={{
              blurRadius: 3,
              position:'relative',
              zIndex:1,
              minHeight: 240,
              resizeMode: "contain",
            }}
            // imageStyle={{opacity: 0.4}}
          >
            <View
              style={{
                minHeight:240,
                position:'absolute',
                top:0,
                bottom:0,
                right:0,
                left:0,
                zIndex:5,
                alignItems: "center",
                backgroundColor:'rgba(18,117,216,0.5)',
                justifyContent: "center",
              }}
            >
              
              <View
                style={{
                  height: 150,
                  width: 150,
                  alignItems:'center',
                  justifyContent:'center',
                }}
              >
                <View style={{
                   position:'absolute',
                      bottom:15,
                      right:-2,
                      zIndex:1,
                }}>
                 <TouchableOpacity>
                  <View
                    style={{
                
                      alignItems: "center",
                      justifyContent:'center',
                      backgroundColor: "#eee",
                      width: 45,
                      borderRadius: 400/2,
                      height: 45,
                    }}
                  >
                    <Icon name={"edit"} size={24} color="black" />
                  </View>
                </TouchableOpacity>
                </View>
                <Image
                 source={require('../../assets/img/sanj.jpg')}
                  style={{
                    height: 140,
                    
                    width: 140,
                    borderColor: "#ddd",
                    borderWidth: 4,
                    borderRadius: 400 / 2,
                  }}
                />
               
              </View>
              <View style={{ alignItems: "center" , marginTop:3}}>
          <Text style={{ fontSize: 22,color:'white',fontFamily:'open-sans-bold',fontStyle:'italic'  }}>
            Sanj Khatri
          </Text>
          <Text style={{ fontSize: 16,color:'#eee', fontFamily:'open-sans-regular',fontStyle:'italic' }}>
            sanj@yahoo.com
          </Text>
        </View>
            </View>
          </ImageBackground>
        </View>
        
        <View style={{ marginTop: 20 }}>
          <View style={styles.accordian}>
            <TouchableOpacity
              onPress={(e) => {
                setpersonalDetails(!personalDetails);
              }}
            >
              <View style={styles.accordianTitle}>
                <Text>personal Details</Text>
                <Icon
                  name={
                    personalDetails
                      ? "keyboard-arrow-down"
                      : "keyboard-arrow-right"
                  }
                  size={24}
                  color="#000"
                />
              </View>
            </TouchableOpacity>
            {personalDetails && (
              <View style={styles.accordianContent}>
                <Text>
                  Name : <Text>DEAD SHOT</Text>
                </Text>
                <Text>
                  Gender : <Text>Male</Text>
                </Text>
                <Text>
                  Email : <Text>Sanj@a.com</Text>
                </Text>
                <Text>
                  Phone : <Text>123456</Text>
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.accordian}>
          <TouchableOpacity
            onPress={(e) => {
              setresume(!resume);
            }}
          >
            <View style={styles.accordianTitle}>
              <Text>Resume</Text>
              <Icon
                name={resume ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          {resume && (
            <View style={styles.accordianContent}>
              <Text>
                <Text>Resume HERE</Text>
              </Text>
            </View>
          )}
        </View>
        <View style={styles.accordian}>
          <TouchableOpacity
            onPress={(e) => {
              setpassword(!password);
            }}
          >
            <View style={styles.accordianTitle}>
              <Text>Change password</Text>
              <Icon
                name={password ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          {password && (
            <View style={styles.accordianContent}>
              <Text>change here</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  accordian: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 10,
    marginTop: 10,
    width: 400,
  },

  accordianTitle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    color: "red",
  },
  accordianContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    fontSize: 20,
  },
  overlay: {
    backgroundColor:'transparent',
    opacity: 0.6
},
});
export default Profile;
