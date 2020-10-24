import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Login({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Signup');
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"grey" }}>
      <Text style={{
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
        }}>Log In</Text>
      <TextInput style={{
          alignSelf:'center',
          height: 20,
          marginBottom: 20,
          color:'white',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          paddingLeft:60,
          paddingRight:60
      }} placeholder="Username"></TextInput>
      <TextInput style={{
        alignSelf:'center',
        height: 20,
        marginBottom: 20,
        color:'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft:60,
        paddingRight:60
        
      }} placeholder="Password" secureTextEntry={true}></TextInput>
      <Button title= "Log in" style={{alignSelf:'center', marginBottom: 20}} onPress={() => navigation.navigate('Dashboard')}/>
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
