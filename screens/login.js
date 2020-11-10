import React, { useState, useEffect, useRef } from 'react';
import {  StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import * as fb from '../components/Firebase/firebase';

export default function Login({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Signup');
    }

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
            
            initialValues={{username: '', password:''}}
            onSubmit={values => fb.loginUser(values.username, values.password, navigation)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                {/* Username Textfield*/}
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
                  name="username"
                  placeholder="Enter Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  
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

