import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  StyleSheet,
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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../shared/icon";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";

//register validation schema
const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Phone number is required"),
  phone: yup.string().required("Address is required"),
  gender: yup.string().required("Bio is required"),
});



function BasicInfo({ navigation }) {
  const { isThemeDark } = useContext(ThemeContext);
  const { authUser, setAuthStatus } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);


  

  const editBasicInfo = () => {
    console.log("fasd");
  };

  const resetBasicInfo = () => {
    setIsEditing(false);

    console.log("fasd");
  };

  const updateBasicInfo = (values) => {
    console.log(values);
    const { firstName, lastName, gender, address, phone, description } = values;

    const resp = 1; //response form server
    if (resp == 1) {
      //reset form
      // actions.resetForm();
      //alert user
      alert("Updated Basic Info Successfully");
    } else {
      alert("Update Failed");
    }
  };

  const updateGender=(handleChange,value)=>{
    handleChange(value);



  }

  const gender=[
    {label:"male", value:"male"},
    {label:"female",value:"feamle"},
    {label:"Others",value:"non"},
  
  ]

  return (
    <ContainerFluid>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: isThemeDark ? "#000" : "#fff",
              justifyContent: "center",
            }}
          >
            <Formik
              initialValues={{
                firstName: "dafa",
                lastName: "fasf",
                phone: "12345",
                address: "fasdfa",
                gender: "male",
                description: "fsdafas",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                handleRegister(values, actions);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 20,
                      paddingHorizontal: 10,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text style={{
                      borderBottomColor:'red',
                      borderRadius:1,
                      borderBottomWidth:2,
                      fontWeight:'bold',
                      borderBottomColor:'black',
                      fontSize:20,
                    }}>Personal Details</Text>

                    {!isEditing ? (
                      <TouchableOpacity style={styles.Editbtns} onPress={() => setIsEditing(true)}>                      
                        <Icon name="edit" size={26} color="blue" />
                        <Text style={{padding:5,fontSize:20,fontWeight:"normal"}}>Edit</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity style={styles.Allbtns} onPress={() => resetBasicInfo()}>
                          <Icon name="update" size={28} color="blue" />
                          <Text style={{padding:5,fontSize:20,fontWeight:"normal"}}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Allbtns} onPress={() => updateBasicInfo(values)}>
                          <Icon name="format-color-reset" size={28} color="blue" />
                           <Text style={{padding:5,fontSize:20,fontWeight:"normal"}}>Update</Text>
                        </TouchableOpacity>
                      </>
                    )}

                   
                  </View>

                  <FormGroup>
                  <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder={"First Name"}
                      editable={isEditing ? true : false}
                    />
                    {touched.firstName && errors.firstName ? (
                      <ErrorText>{errors.firstName}</ErrorText>
                    ) : null}
                  </FormGroup>
                  
                  <FormGroup>  
                        
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                      editable={isEditing ? true : false}
                    />
                    {touched.lastName && errors.lastName ? (
                      <ErrorText>{errors.lastName}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                  <Text style={styles.label}>Phone</Text>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder={"phone"}
                      editable={isEditing ? true : false}
                    />
                    {touched.phone && errors.phone ? (
                      <ErrorText>{errors.phone}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                  <Text style={styles.label}>Address</Text>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      placeholder={"Address"}
                      editable={isEditing ? true : false}
                    />
                    {touched.address && errors.address ? (
                      <ErrorText>{errors.address}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <View>
                  <Text style={styles.label}>Gender</Text>

                    <RadioForm
                      style={{
                        ...styles.inputbtn,
                        ...(!isEditing && styles.inputNoEditablebtn),
                      }}
                      radio_props={gender}
                      initial={1}
                      buttonSize={20}
                      buttonOuterSize={30}
                      
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      animation={true}
                      onPress={(value) => {
                        updateGender(handleChange("gender"),value);
                     
                    }}
                      // value={values.phone}
                      // onChangeText={handleChange("phone")}
                      // onBlur={handleBlur("phone")}
                      // placeholder={"Phone"}
                      
                    />
                    
                      
                    
                    {touched.phone && errors.phone ? (
                      <ErrorText>{errors.phone}</ErrorText>
                    ) : null}
                    </View>
                  </FormGroup>

                  <FormGroup>
                  <Text style={styles.label}>Bio</Text>
                    <TextInput
                      style={{
                        ...styles.input,
                        ...(!isEditing && styles.inputNoEditable),
                      }}
                      multiline
                      minHeight={100}
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      placeholder={"About yourself"}
                      editable={isEditing ? true : false}
                    />
                    {touched.description && errors.description ? (
                      <ErrorText>{errors.description}</ErrorText>
                    ) : null}
                  </FormGroup>

                  {/* <FormGroup>
                    <Input
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={"Last Name"}
                    />
                    {touched.email && errors.email ? (
                      <ErrorText>{errors.email}</ErrorText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder={"Email"}
                    />
                    {touched.email && errors.email ? (
                      <ErrorText>{errors.email}</ErrorText>
                    ) : null}
                  </FormGroup> */}

                  {/* <FormGroup>
                    <Input
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder={"Password"}
                      secureTextEntry={true}
                    />
                    {touched.password && errors.password ? (
                      <ErrorText>{errors.password}</ErrorText>
                    ) : null}
                  </FormGroup> */}
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerFluid>
  );
}

export default BasicInfo;

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  inputNoEditable: {
    backgroundColor: "#ccc",
    borderWidth: 0,
  },
  label:{
    fontSize:16,
    fontWeight:'bold'
  },
  Allbtns:{
    backgroundColor:"#fff",
    borderColor:"black",
    borderWidth:1,
    flexDirection:"row-reverse",
    marginRight:30,
    justifyContent:'space-between',
   
  },
  Editbtns:{
    backgroundColor:"#fff",
    borderColor:"black",
    borderWidth:1,
    flexDirection:"row-reverse",
    marginRight:0,
    justifyContent:'space-between',
    
   
  },
  inputNoEditablebtn:{
    backgroundColor: "#ccc",
    borderWidth: 0, 
    padding: 8,
    justifyContent:"space-between"
    
    
    

  },
  inputbtn:{
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
    justifyContent:"space-between"
   
  }
});
