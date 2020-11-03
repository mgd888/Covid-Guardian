import * as firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

//initialize firebase app
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("authed");
}

export const fb = firebase;
