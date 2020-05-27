import React, { Component } from 'react';
import { Alert, Button, TextInput, View,Text, StyleSheet } from 'react-native';

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
        <View style={styles.btn}>
        <Button
          title={'Login'}
          
          onPress={this.onLogin.bind(this)}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   position:'absolute',
   left:0,   
   top:0,
   backgroundColor: '#ecf0f1',
   padding:20,
   backgroundColor:'gray',
   height:800,
   width:500
  },
  input: {
    width: 300,
    height: 44,
    padding: 12,
    borderWidth: 1,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderColor: 'black',
    marginBottom: 10,
    marginTop:10,
    fontSize:18
  },
  btn:{
   width: 100,
  justifyContent:'center',
  alignContent:'center',
  marginLeft:100,
 
 
  


    
  }
});