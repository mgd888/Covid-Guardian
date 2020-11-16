import React, { useState, useEffect, useRef } from 'react';
import {  Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';


export default function Login({navigation}) {

  const [emailData, setEmailData] = useState(''); //add emailData to state
  const [isEmailValid, setIsEmailValid] = useState(false); //used to see if the email is valid (through regex)
  const [passwordData, setPasswordData] = useState(-1); //add passwordData to state
  const [isPasswordValid, setIsPasswordValid] = useState(false); //used to see if the password is valid (through regex)


    const pressHandler = () => {
        navigation.navigate('Signup');
    }


      //check if email formatt is correct
      if(reg.test(emailData) == false){
        Alert.alert('Error', 'Incorrect email format');
        return;
      }

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

