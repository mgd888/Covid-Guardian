import * as firebase from 'firebase';

import firebaseConfig from './firebaseConfig';

//initialize firebase app
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

//firebase functions below