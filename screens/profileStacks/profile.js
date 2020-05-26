import React, { useState,useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text,Image,StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import AppTitle from "../../shared/appTitleText";
import AppText from "../../shared/appText";
import Icon from "../../shared/icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

function Profile() {
  const [personalDetails,setpersonalDetails]=useState(true);
  const [resume,setresume]=useState(false);
  const [password,setpassword]=useState(false);
     return (
       
      <ScrollView>
        <View style={{alignItems:'center', padding:20,marginTop:10}}>
          <Image
          source={require('../../assets/img/default-profile.png')}
          style={{
            height:200,
            width:200
          }}
          />
          <View style={{marginTop:20}}>
          <View style={styles.accordian}>
         <TouchableOpacity
         onPress={(e)=>{
           setpersonalDetails(!personalDetails)
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
                onPress={(e)=>{
                  setresume(!resume)
                }}
                >
              <View style={styles.accordianTitle}>
               
                  
                    <Text>Resume</Text>
                    <Icon
                    name={
                      resume
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-right"
                    }
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
                <TouchableOpacity onPress={(e)=>{
                  setpassword(!password)
                }}
                >
                  <View style={styles.accordianTitle}>
                    <Text>Change password</Text>
                    <Icon 
                    name={
                    password 
                    ? "keyboard-arrow-down"
                    : "keyboard-arrow-right"
                    }
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
   padding:10,
   marginTop:10,
   width:400
   },

  accordianTitle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    color:'red',
    
    
  },
  accordianContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    fontSize:20,
  },
});
export default Profile;
