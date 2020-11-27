/*
 *  firebase.js - COVID Guardian - CS 372 Project
 *  Purpose: handles the connection to the firebase servers and provides some functions to interact with  
 *           data related to firebase.
 * 
 *  Author: Jason Wolfe 
 */
import { Alert } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

//initialize firebase app
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig); //initialize firebase with the config
    console.log("Firebase Connection Initialized");
}

export const fb = firebase; //export the variable to access firebase

export const db = firebase.firestore(); //export the variable to access the firestore database

export const auth = firebase.auth(); //export the authentication portion of firebase

/*
 * loginUser(email, password, navigation)
 *      email: string = user's email
 *      password: string = user's password
 *      navigation: Object = corresponds to the navigation component of the screen
 *
 *  Creates an authorization request to firebase's authentication services using the given email and password
 *  If successful, user's naviation stack will be popped to the top.
 *  If unsuccessful, an alert box will be shown to the user with the given error (Ex: wrong password)
 */
export async function loginUser(email, password, navigation) {
    await auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(`${email} has logged in successfully`);
        navigation.popToTop();

    }).catch((error) => {
        console.log(`${email} unable to login: ${error.code}`);
        Alert.alert('Unable to Log-in', error.message);

    });
}

/*
 * registerUser(email, password, name, userRegionID, userAge, navigation)
 *      email: string = user's email
 *      password: string = user's password
 *      name: string = user's full name
 *      userRegionID: number = the region ID corresponding to user's location
 *      userAge: number = corresponds to the user's age
 *      navigation: Object = corresponds to the navigation component of the screen
 *
 *  Creates an authorization request to firebase's authentication services to create an account with the given information.
 *  If successful, user's naviation stack will be popped to the top and an additional request will be made to firestore to
 *                 create a user record in the 'users' collection with the user's regionID and age.
 *  If unsuccessful, an alert box will be shown to the user with the given error (Ex: email already used)
 */
export function registerUser(email, password, name, userRegionID, userAge, navigation) {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        cred.user.updateProfile({displayName: name}); //update the 'displayName' of the firebase auth account with the given data
        return db.collection('users').doc(cred.user.uid).set({ //make a request to firestore to save the user info in a document with the ID given from firebase authentication
            regionID: parseInt(userRegionID),
            age: parseInt(userAge)
        });
    }).then(() => {
        console.log(`User ${email} registered successful!`);
        navigation.popToTop();
    }).catch((error) => {
        console.log(error);
    });
}

export const logout = () => auth.signOut(); //logs the user out from the auth session