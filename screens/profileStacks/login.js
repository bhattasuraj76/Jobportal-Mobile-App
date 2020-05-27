import React, { Component } from 'react';
import { Alert, Button, TextInput, View,Text, StyleSheet } from 'react-native';
import JobApplyBtn from '../../shared/appBtn';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
     email: '',
      password: '',
    };
  }
  
  onLogin() {
    const { email, password } = this.state;

    Alert.alert(' No Credentials');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign:'left',
        fontSize:20,
        color:'black'
       
      }} >Email</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <Text style={{
          marginTop:5,
          fontSize:20,
          
        }}>
          Password</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
      
       <View>
         <JobApplyBtn title='login'/>
       </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#36485f',
    paddingLeft:60,
    paddingRight:60,
    height:550

  },
  input: {
    alignSelf:'stretch',
    height:40,
    marginBottom:40,
    color:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#f8f8f8'
  },
 
 
 
  


    
  
});