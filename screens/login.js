import React, { useState, useEffect, useRef } from 'react';
<<<<<<< Updated upstream
import {  StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
=======
import {  Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

>>>>>>> Stashed changes

export default function Login({navigation}) {

  const [emailData, setEmailData] = useState(''); //add emailData to state
  const [isEmailValid, setIsEmailValid] = useState(false); //used to see if the email is valid (through regex)
  const [passwordData, setPasswordData] = useState(-1); //add passwordData to state
  const [isPasswordValid, setIsPasswordValid] = useState(false); //used to see if the password is valid (through regex)


    const pressHandler = () => {
        navigation.navigate('Signup');
    }


<<<<<<< Updated upstream
    return (
    
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"grey" }}>
          {/* Title: Log in */}
          <Text 
            style={{
              alignSelf:'center', 
              fontSize: 45,
              color: 'white',
              paddingBottom: 10,
              marginBottom:20,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              fontWeight:'bold',
              paddingLeft:60,
              paddingRight:60
              }}>Log In
          </Text> 
            
          <Formik 
            
            initialValues={{email: '', password:''}}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                {/* Email Textfield*/}
                <TextInput 
                  style={{
                    alignSelf:'center',
                    height: 20,
                    marginBottom: 20,
                    color:'white',
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    paddingLeft:60,
                    paddingRight:60
                  }} 
                  name="email"
                  placeholder="Enter Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  
                />
                {/* Password Textfield*/}
                <TextInput 
                  style={{
                    alignSelf:'center',
                    height: 20,
                    marginBottom: 20,
                    color:'white',
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    paddingLeft:60,
                    paddingRight:60
                  }}
                  placeholder="Enter Password" 
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                <Button onPress={handleSubmit} title="Log in"/>
              </>
            )}
=======
      //check if email formatt is correct
      if(reg.test(emailData) == false){
        Alert.alert('Error', 'Incorrect email format');
        return;
      }
>>>>>>> Stashed changes

          </Formik>


        <Text style={{alignSelf:'center', marginBottom: 20, marginTop: 20}}>Don't have an account?</Text>
        <Button
          title="Sign Up Now"
          onPress={pressHandler}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});

