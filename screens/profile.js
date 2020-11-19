import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import * as fb from '../components/Firebase/firebase';

export default function Profile({navigation}) {
    
    const [refresh, setRefresh] = useState(0);

    const didFocus = navigation.addListener(
        'willFocus',
        payload => {
            console.log("load");
          setRefresh(Math.random());
        }
      );

    console.log(fb.auth.currentUser);

    if(!fb.auth.currentUser) {
        const pressHandler1 = () => {
            //setRefresh(1);
            navigation.navigate('Login');
        }

        const pressHandler2 = () => {
            //setRefresh(1);
            navigation.navigate('Signup');
        }

        return (
            <View style={styles.container}>
                <Text style={styles.info}>COVID Guardian - the first mobile app for people living in Saskatchewan to check the most up-to-date information at anywhere and anytime.{"\n"}</Text>
                <Text style={styles.texture}>To check this page, you need to login the COVID Guardian account first.</Text>
                <TouchableHighlight style={styles.link} onPress={pressHandler1}>
                    <Text style={styles.button}>Login</Text>
                </TouchableHighlight>
                <Text style={styles.texture}>If you don't have an account, please sign up better use of COVID Guardian.</Text>
                <TouchableHighlight style={styles.link} onPress={pressHandler2}>
                    <Text style={styles.button}>Sign up</Text>
                </TouchableHighlight>
            </View>
        );
    }
    else{
       const pressHandler = () => {
            //setRefresh(1);
            fb.logout();
            navigation.navigate('Home');
       }
        return (
            <View style={styles.container}>
                <Text style={styles.texture}>Welcome to COVID Guardian, {fb.auth.currentUser.displayName}.</Text>
                <TouchableHighlight style={styles.link} onPress={pressHandler}>
                    <Text style={styles.button}>Log out</Text>
                </TouchableHighlight>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});