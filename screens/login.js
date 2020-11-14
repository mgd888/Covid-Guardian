import React, { useState, useEffect, useRef } from 'react';
import {  Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import * as fb from '../components/Firebase/firebase';
import Input from '../components/Input';


export default function Login({navigation}) {

    const [emailData, setEmailData] = useState(''); //add EmailData to state
    const [isEmailValid, setIsEmailValid] = useState(false); //used to see if the email is valid (through regex)
    const [passwordData, setPasswordData] = useState(''); //add reviewData to state
    const [isPasswordValid, setIsPasswordValid] = useState(false); //used to see if the rating is valid (through regex)

    const submitButton = () => {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

    const pressHandler = () => {
        navigation.navigate('Signup');
    }

    return(
      <View style={styles.container}>
        <Text style={styles.title}> Log In </Text>
        <Input 
          style={styles.input} 
          name="email"
          placeholder="Enter Email"
          pattern={'/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'} //regex for email
          onChangeText={text => setEmailData(text)}
          onValidation={result => setIsEmailValid(result)}
        />
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
        <Button onPress={submitButton} title="Log in"/>
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
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor:"grey"
    },
    title:{
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

    },
    input:{
      backgroundColor: 'white',
      alignSelf:'center',
      width: 250,
      height: 30,
      marginBottom: 20,
      color:'black',
      borderColor: 'black',
      borderWidth: 2,
      paddingLeft:60,
      paddingRight:60
   
    },
});

