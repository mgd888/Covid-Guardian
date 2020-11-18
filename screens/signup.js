import React, { useState, useEffect, useRef } from 'react';
import {  Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Picker} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';



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
      if(regionData=='0'){
        Alert.alert('Error', 'Fill region field please');
        return;
      }

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
      fb.registerUser(emailData, passwordData, nameData, ageData, regionData, navigation);
      navigation.navigate('Login');
      
    }
    
    

    return(
      <View style={styles.container}>
        <Text style={styles.title}> Sign Up </Text>
        <Input 
          style={styles.input} 
          name="name"
          placeholder="Enter Name"
          onChangeText={text => setNameData(text)}
          onValidation={result => setIsNameValid(result)}
        />
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
        defaultValue="0"
        containerStyle={{height: 30, width: 250}}
        style={styles.inputdrop}
        dropDownStyle={{backgroundColor: '#fafafa', flex:1}}
        onValueChange={text => setRegionData(text)}
        
        dropDownMaxHeight={240}
      />
        <Text/>
        <Input 
          style={styles.input} 
          name="userAge"
          placeholder="Enter Age"
          keyboardType={'numeric'}
          onChangeText={text => setAgeData(text)}
          onValidation={result => setIsAgeValid(result)}
        />
        
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
        {/* <Picker
          mode="dropdown"
          style={styles.inputdrop} 
          name = "userRegionID"
          selectedValue={regionData}
          onValueChange={text => setRegionData(text)}
          onValidation={result => setIsRegionValid(result)}
        >
        <Picker.Item label="Select Region" value="0" />
        <Picker.Item label="Far North West" value="1" />
        <Picker.Item label="Far North Central" value="2" />
        <Picker.Item label="Far North East" value="3" />
        <Picker.Item label="North West" value="4" />
        <Picker.Item label="North Central" value="5" />
        <Picker.Item label="North East" value="6" />
        <Picker.Item label="Saskatoon" value="7" />
        <Picker.Item label="Central West" value="8" />
        <Picker.Item label="Central East" value="9" />
        <Picker.Item label="Regina" value="10" />
        <Picker.Item label="South West" value="11" />
        <Picker.Item label="South Central" value="12" />
        <Picker.Item label="South East" value="13" />
        </Picker> */}

        

      <Text/>
      <Button onPress={submitButton} title="Sign Up" />
        
      </View>
        
    );


}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:"grey",
   
    
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
  inputdrop:{
    color: 'black',
    alignItems:'center',
    height: 30,
    width: 250,
    backgroundColor: '#fafafa',
    borderColor: 'black', 
    borderWidth:1.5,
    flex:1    
    
  },
});