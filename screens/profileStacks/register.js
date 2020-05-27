import React from "react";
import { View, Text, StyleSheet,TextInput,TouchableOpacity,ScrollView } from "react-native";
import JobApplyBtn from "../../shared/appBtn";


function Register() {
     return (
       <ScrollView>
       <View style={styles.container}>
         <View style={styles.regform}>

         <Text style={styles.header}>Registration</Text>

         <TextInput
         style={styles.textinput}
         placeholder="First Name"
        
         />
         <TextInput
         style={styles.textinput}
         placeholder="Last Name"
         
         />
         <TextInput
         style={styles.textinput}
         placeholder="Email"
         
         />
         <TextInput
         style={styles.textinput}
         placeholder="Password"
         secureTextEntry={true}
         
         />
         {/* <TouchableOpacity style={styles.button}>
           <Text style={styles.btnText}>Register</Text>
         </TouchableOpacity> */}
         <View>
           <JobApplyBtn
           title="Register"
           />

         </View>
         </View>
       </View>
       </ScrollView>
     );
}
const styles=StyleSheet.create({

  container:{
    
    flex:1,
    justifyContent:'center',
    backgroundColor:'#36485f',
    paddingLeft:60,
    paddingRight:60,
    height:550

  },
  regform:{
    alignSelf:'stretch',
  },

  header:{
    fontSize:24,
    color:'#fff',
    paddingBottom:10,
    marginBottom:40,
    borderBottomWidth:1,
    borderBottomColor:'#199187'
  },
  textinput:{
    alignSelf:'stretch',
    height:40,
    marginBottom:40,
    color:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#f8f8f8'


  },
  button:{
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:"#1275d8",
    marginTop:30,

  },
  btnText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:18

  }

})

export default Register;
