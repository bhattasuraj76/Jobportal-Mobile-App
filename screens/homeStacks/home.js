import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text,Image,StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import TitleText from "../../shared/titleText";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesome5 } from '@expo/vector-icons';


function Home ({navigation}) {
    return (
      <View>
    <View style={{ backgroundColor: "gray",borderColor: 'black', borderRadius: 10, overflow: "hidden",marginTop:5,flexDirection: 'row' }}>
      
        <Image
          source={require('../../assets/img/default-profile.png')}
          style={{
            height: 100,
            width: 100,         
            marginTop: 3
          }}/>

          <View style={{ padding: 10, width: 155,}}>
          <Text style={{alignContent:'center', alignItems:'center', fontSize:20,fontWeight:'bold'}}>Web Developer</Text>
          <Text style={{alignContent:'center', alignItems:'center', fontSize:16}}>ABC Company</Text>
          <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>Kathmandu</Text></Text>
          <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>RS.XXXX</Text></Text>
          <Text style={{  paddingTop: 5,fontSize:16,marginTop:1 }}>mid-level</Text>
          <View style={{ marginLeft:140,padding:5, width: 155,}}>
        <Text style={{ marginLeft:5,position:'relative',marginBottom:1}}>Deadline:2016/05/01</Text>
        </View>
        </View>
        

        
    </View>
    <View style={{ backgroundColor: "gray",borderColor: 'black', borderRadius: 10, overflow: "hidden",marginTop:5,flexDirection: 'row' }}>
      
      <Image
        source={require('../../assets/img/default-profile.png')}
        style={{
          height: 100,
          width: 100,         
          marginTop: 3
        }}/>

        <View style={{ padding: 10, width: 155,}}>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:20,fontWeight:'bold'}}>Web Developer</Text>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:16}}>ABC Company</Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>Kathmandu</Text></Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>RS.XXXX</Text></Text>
        <Text style={{  paddingTop: 5,fontSize:16,marginTop:1 }}>Position: mid-level</Text>
        <View style={{ marginLeft:140,padding:5, width: 155,}}>
      <Text style={{ marginLeft:5,position:'relative'}}>Deadline:2016/05/01</Text>
      </View>
      </View>
      

      
  </View>
  <View style={{ backgroundColor: "gray",borderColor: 'black', borderRadius: 10, overflow: "hidden",marginTop:5,flexDirection: 'row' }}>
      
      <Image
        source={require('../../assets/img/default-profile.png')}
        style={{
          height: 100,
          width: 100,         
          marginTop: 3
        }}/>

        <View style={{ padding: 10, width: 155,}}>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:20,fontWeight:'bold'}}>Web Developer</Text>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:16}}>ABC Company</Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>Kathmandu</Text></Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>RS.XXXX</Text></Text>
        <Text style={{  paddingTop: 5,fontSize:16,marginTop:1 }}>Position: mid-level</Text>
        <View style={{ marginLeft:140,padding:5, width: 155,}}>
      <Text style={{ marginLeft:5,position:'relative'}}>Deadline:2016/05/01</Text>
      </View>
      </View>
      

      
  </View>
  <View style={{ backgroundColor: "gray",borderColor: 'black', borderRadius: 10, overflow: "hidden",marginTop:5,flexDirection: 'row' }}>
      
      <Image
        source={require('../../assets/img/default-profile.png')}
        style={{
          height: 100,
          width: 100,         
          marginTop: 3
        }}/>

        <View style={{ padding: 10, width: 155,}}>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:20,fontWeight:'bold'}}>Web Developer</Text>
        <Text style={{alignContent:'center', alignItems:'center', fontSize:16}}>ABC Company</Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>Kathmandu</Text></Text>
        <Text style={{marginLeft:20,}}><FontAwesome5 name="hand-point-right" color="black"  /><Text style={{fontSize:14,}}>RS.XXXX</Text></Text>
        <Text style={{  paddingTop: 5,fontSize:16,marginTop:1 }}>Position: mid-level</Text>
        <View style={{ marginLeft:140,padding:5, width: 155,}}>
      <Text style={{ marginLeft:5,position:'relative'}}>Deadline:2016/05/01</Text>
      </View>
      </View>
      

      
  </View>
    </View>
      
    );
}


const styles=StyleSheet.create({
 

})

export default Home;