/*
 *  setup.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the setup screen for the application. 
 * 
 *  Author: Maria Christine Anne De Leon
 */
import React, { useState} from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import * as fb from '../components/Firebase/firebase';
import Input from '../components/Input';

export default function Signup({navigation}) {
 
    const [nameData, setNameData] = useState(''); //add NameData to state
    const [isNameValid, setIsNameValid] = useState(false); //used to see if the name is valid 
    const [ageData, setAgeData] = useState(''); //add AgeData to state
    const [isAgeValid, setIsAgeValid] = useState(false); //used to see if the Age is valid 
    const [regionData, setRegionData] = useState(''); //add RegionData to state
    const [isRegionValid, setIsRegionValid] = useState(false); //used to see if the region is valid 
    const [emailData, setEmailData] = useState(''); //add EmailData to state
    const [isEmailValid, setIsEmailValid] = useState(false); //used to see if the email is valid (through regex)
    const [passwordData, setPasswordData] = useState(''); //add passwordData to state
    const [isPasswordValid, setIsPasswordValid] = useState(false); //used to see if the password is valid (through regex)
    const [cpasswordData, setcPasswordData] = useState(''); //add cpasswordData to state
    const [iscPasswordValid, setIscPasswordValid] = useState(false); //used to see if the confirmed password is valid (through regex)

    /*
    * submitButton()
    *   Function that is called when user presses the submit button
    *   It validates that we recieved the correct input and then sends the data to firebase.
    */
    const submitButton = () => {
      //check if fields are empty
      if (!isNameValid && !isAgeValid &&
          !isEmailValid && !isPasswordValid &&
          !isRegionValid && !iscPasswordValid){
        Alert.alert('Error', 'Fields are empty');
        return;
      }

      //check if name is not empty
      if(!isNameValid){
        Alert.alert('Error', 'Fill name field please');
        return;
      }

      //check if Age is Empty or  above 16
      if(!isAgeValid){
        Alert.alert('Error', 'Fill age field please');
        return;
      }
      if(ageData<16){
        Alert.alert('Error', 'Must be atleast 16 years old');
        return;
      }

      //check if region is empty
      if(regionData==0){
        Alert.alert('Error', 'Fill region field please');
        return;
      }

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email pattern

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
      
      //check if confirmed password is same as password
      if(passwordData !== cpasswordData){
        Alert.alert('Error', 'Confirmed password not same as password');
        return;
      }
      //if nothing wrong connect to firebase
      fb.registerUser(emailData, passwordData, nameData, regionData, ageData, navigation);
      navigation.navigate('Login');
    }
    
    
    //Render the UI of the screen
    return(
      <KeyboardAvoidingView behavior={Platform.OS == 'ios'? 'padding' : 'height'} style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.textInputs}>
          <View style={styles.inputView}>
            <Input 
              style={styles.input} 
              name="name"
              placeholder="Enter Name"
              onChangeText={text => setNameData(text)}
              onValidation={result => setIsNameValid(result)}
            />
          </View>
          <DropDownPicker
            items={[
                {label: 'Select Region', value: '0'},
                {label: 'Far North West', value: '1'},
                {label: 'Far North Central', value: '2'},
                {label: 'Far North East', value: '3'},
                {label: 'North West', value: '4'},
                {label: 'North Central', value: '5'},
                {label: 'North East', value: '6'},
                {label: 'Saskatoon', value: '7'},
                {label: 'Central West', value: '8'},
                {label: 'Cetral East', value: '9'},
                {label: 'Regina', value: '10'},
                {label: 'South West', value: '11'},
                {label: 'South West', value: '12'},
                {label: 'South East', value: '13'}
            ]}
            defaultValue='0'
            containerStyle={{height: 30, width: 250}}
            style={styles.inputdrop}
            dropDownStyle={{backgroundColor: '#fafafa', flex:1}}
            onChangeItem={text => setRegionData(text)}
            onValidation={result => setIsRegionValid(result)}

            dropDownMaxHeight={240}
          />
          <Text />
          <View style={styles.inputView}>
            <Input 
              style={styles.input} 
              name="userAge"
              placeholder="Enter Age"
              keyboardType={'numeric'}
              onChangeText={text => setAgeData(text)}
              onValidation={result => setIsAgeValid(result)}
            />
          </View>
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
          <View style={styles.inputView}>
            <Input 
              style={styles.input}
              name="confirmpassword"
              placeholder="Confirm Password" 
              onChangeText={text => setcPasswordData(text)}
              onValidation={result => setIscPasswordValid(result)}
              pattern={[
                '^.{6,}$', // min 6 chars
              ]}
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitButton}>
            <Text style={styles.submitText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
}

//Define the styles for the signup page
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
  inputdrop:{
    color: '#C4C4C6',
    alignItems:'center',
    flex:1,

    backgroundColor: 'white',
    borderRadius: 5,
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

