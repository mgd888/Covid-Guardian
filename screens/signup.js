import * as React from 'react';
import {  StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import * as fb from '../components/Firebase/firebase';

export default function Signup({navigation}) {
  const test = (values) => {
    fb.registerUser('jason.wolfe71@gmail.com', 'test1234', 'test', 1, 'test')
  };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"grey" }}>
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
        }}>
          Sign Up
      </Text>

  

      <Formik 
        
        initialValues={{
          name: '', 
          username: '', 
          age:'',
          email:'',
          password:'',
          confirmpassword:''}}
        onSubmit={values => fb.registerUser(values.email, values.password, values.name, 1, values.age, navigation)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            {/*Name Textfield*/}
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
              name="name"
              placeholder="Enter name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              
            />
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
            {/* Age Textfield */}
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
              name="age"
              placeholder="Enter Age"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              keyboardType="numeric"
            />

            {/* Email Textfield */}
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
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
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
            {/* Confirm Password Textfield */}
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
              placeholder="Confirm Password" 
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              value={values.confirmpassword}
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Sign in"/>
          </>
        )}

      </Formik>
      <Text></Text>
    {/* TODO: update where this should redirect @lee200351644 @Maverickbear77 @squaredx */}
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});
