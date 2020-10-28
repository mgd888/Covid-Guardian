import * as firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

//initialize firebase app
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("authed");
}

const db = firebase.firestore();

export const fb = firebase;

//firebase functions below

export function submitReview(review) {


    db.collection('ratings').doc().set(review).then(() => {
        return true;
    }).catch(() => {
        console.error('an error has occured with submitting the review');
        return false;
    });
}