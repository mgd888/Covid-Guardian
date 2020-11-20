import {Alert} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

//initialize firebase app
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("authed");
}

export const fb = firebase;

export const db = firebase.firestore();

export const auth = firebase.auth();

//export const loginWithEmail = (email, password) =>
//  auth.signInWithEmailAndPassword(email, password);

//export const registerWithEmail = (email, password) =>
//  auth.createUserWithEmailAndPassword(email, password);

export async function loginUser(email, password, navigation) {
    await auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(`${email} has logged in successfully`);
        navigation.popToTop();

    }).catch((error) => {
        console.log(`${email} unable to login: ${error.code}`);
        Alert.alert('Unable to Log-in', error.message);

    });
}

export function registerUser(email, password, name, userRegionID, userAge, navigation) {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        cred.user.updateProfile({displayName: name});
        return db.collection('users').doc(cred.user.uid).set({
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

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);