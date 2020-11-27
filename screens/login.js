/*
 *  login.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the login screen for the application. 
 * 
 *  Author: Maria Christine Anne De Leon
 */
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, Button, TouchableOpacity, Platform } from 'react-native';

import * as fb from '../components/Firebase/firebase';
import Input from '../components/Input';

export default function Login({navigation}) {

    const [emailData, setEmailData] = useState(''); //add EmailData to state
    const [isEmailValid, setIsEmailValid] = useState(false); //used to see if the email is valid (through regex)
    const [passwordData, setPasswordData] = useState(''); //add reviewData to state
    const [isPasswordValid, setIsPasswordValid] = useState(false); //used to see if the rating is valid (through regex)

    
    /*
    * submitButton()
    *   Function that is called when user presses the submit button
    *   It validates that we recieved the correct input and then sends the data to firebase.
    */
    const submitButton = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email regex

      //check if fields are empty
      if (!isEmailValid && !isPasswordValid){
        Alert.alert('Error', 'Fields are empty');
        return;
      }

      //check if email formatt is correct
      if(reg.test(emailData)===false){
        Alert.alert('Error', 'Incorrect email format');
        return;
      }

      //check if password format is correct
      if(passwordData.length<6){
        Alert.alert('Error', 'Password less than 6');
        return;
      }      
      
      //if nothing wrong connect to firebase
      fb.loginUser(emailData,passwordData,navigation);
  
    }
    
    /*
    * pressHandler()
    *   Handle when the user presses the sign up button
    */
    const pressHandler = () => {
        navigation.navigate('Signup');
    }

    //render the screen
    return(
      <KeyboardAvoidingView behavior={Platform.OS == 'ios'? 'padding' : 'height'} style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Log In</Text>
        </View>
        <View style={styles.textInputs}>
          <View style={styles.inputView}>
            <Input 
              style={styles.input} 
              name="email"
              placeholder="Enter Email"
              pattern={'/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'} //regex for email
              onChangeText={text => setEmailData(text)}
              onValidation={result => setIsEmailValid(result)}
            />
          </View>
          <View style={styles.inputView}>
            <Input 
              style={styles.input}
              name="password"
              placeholder="Enter Password" 
              onChangeText={text => setPasswordData(text)}
              onValidation={result => setIsPasswordValid(result)}
              pattern={[
                '^.{6,}$', // min 6 chars
              ]}
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitButton}>
            <Text style={styles.submitText}>Log in</Text>
        </TouchableOpacity>
        <Text style={{alignSelf:'center', marginVertical: 20}}>Don't have an account?</Text>
        <Button
          title="Sign Up Now"
          onPress={pressHandler}
        />
      </KeyboardAvoidingView>
    );
}

//define the styles for the screen
const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    title:{
      alignSelf:'center', 
      fontSize: 45,
      fontWeight:'bold',
      paddingLeft:60,
      paddingRight:60
    },
    titleBox: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      paddingBottom: 10,
      marginBottom:20,
    },
    input: {
      padding: 10
    },
    inputView: {
      backgroundColor: 'white',
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20,
    },
    textInputs: {
      flexDirection: 'column',
      alignContent: 'stretch',
      width: 250
    },
    submitButton: {
      backgroundColor: 'dodgerblue',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      paddingHorizontal: 10
    },
    submitText: {
      color: 'white',
      fontSize: 20
    },
});

