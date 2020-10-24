import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Signup() {
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
      }}>Sign Up</Text>

      <TextInput style={{
        alignSelf:'center',
        height: 20,
        marginBottom: 20,
        color:'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft:60,
        paddingRight:60

      }} placeholder="Name"></TextInput>
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
      }} placeholder="City"></TextInput>
      <TextInput style={{
        alignSelf:'center',
        height: 20,
        marginBottom: 20,
        color:'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft:60,
        paddingRight:60
      }} placeholder="Age"></TextInput>
      <TextInput style={{
        alignSelf:'center',
        height: 20,
        marginBottom: 20,
        color:'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft:60,
        paddingRight:60

      }} placeholder="Email"></TextInput>
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
      <TextInput style={{
        alignSelf:'center',
        height: 20,
        marginBottom: 20,
        color:'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft:60,
        paddingRight:60
      }} placeholder="Confirm Password" secureTextEntry={true}></TextInput>
       {/* We need to update where it will redirect */}
      {/* <Button
        title="Create Account"
        onPress={() => navigation.navigate('Dashboard')}
      /> */}
      <Text></Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});
