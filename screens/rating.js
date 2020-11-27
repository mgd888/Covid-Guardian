/*
 *  rating.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the rating screen for the application
 * 
 *  Author: Jason Wolfe
 */
import React, {useState} from 'react';
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import * as fb from '../components/Firebase/firebase';
import * as utils from '../components/misc/utilities';

import Input from '../components/Input';

export default function Rating(props) {

    const [commentData, setCommentData] = useState(''); //add commentData to state
    const [isCommentValid, setIsCommentValid] = useState(false); //used to see if the comment is valid (through regex)
    const [reviewData, setReviewData] = useState(-1); //add reviewData to state
    const [isReviewValid, setIsReviewValid] = useState(false); //used to see if the rating is valid (through regex)

    const regionID = props.navigation.getParam('regionID', -1); //get the regionID from props. default to -1 if not passed

    /*
    * pressHandler()
    *   Handle when the user presses the cancel button (go back)
    */
    const pressHandler = () => {
        props.navigation.pop();
    }

    /*
    * submitButton()
    *   Function that is called when user presses the submit button
    *   It validates that we recieved the correct input and then sends the data to firebase.
    */
    const submitButton = () => {

        let reviewInt = parseInt(reviewData); //convert to number

        //check that the comment is less than or equal to 100
        if(!isCommentValid) {
            Alert.alert('Error', 'Please ensure the comment is not empty and under 100 characters.');
            return;
        }

        //check the the review number is really a number and 1-5
        if(!isReviewValid || (reviewInt < 1 || reviewInt > 5)) {
            Alert.alert('Error', 'Please ensure the rating is a number between 1-5.');
            return;
        }
        
        //Check if the region id is valid
        if(regionID == -1){
            Alert.alert('Error', 'Invalid region ID.');
            return;
        }

        //check if user authed
        if(!fb.auth.currentUser) {
            Alert.alert('Error', 'You are not signed in');
            return;
        }

        //If we got to this point we have valid data that can be submitted

        //create an object containing the review data
        let data = {
            comment: commentData,
            date: fb.fb.firestore.Timestamp.now(),
            rating: reviewInt,
            regionID: regionID,
            userName: fb.auth.currentUser.displayName
        };
        
        let db = fb.fb.firestore(); //reference to the firestore

        console.log('Attempting to submit review to firebase...');

        //attempt to submit the data to ratings
        db.collection('ratings').doc().set(data).then(() => {
            Alert.alert('Success!', 'Your review has been submitted. Thank you for your input!');
            console.log('Review submitted successfully!');
            props.navigation.popToTop(); //return to the top of stack
        }).catch((error) => {
            Alert.alert('Unable to submit review', error.message);
            console.log('Error submitting review');
            console.error('an error has occured with submitting the review: ' + error.code);
        });
    }

    //Check to see if the user is not logged in
    if(!fb.auth.currentUser) {
        //Prompt the user about the error and give them the option to login or register
        Alert.alert('Error', 'You must be signed in to submit a review', 
            [
                {
                    text: 'Log in',
                    onPress: () => props.navigation.popToTop() && props.navigation.navigate('Login') //reset the current navigation stack and change the view to the login screen
                },
                {
                    text: 'Sign up',
                    onPress: () => props.navigation.popToTop() && props.navigation.navigate('Signup') //reset the current navigation stack and change the view to the signup screen
                },
                {
                    text: 'Cancel',
                    onPress: () => props.navigation.pop(), //Give the user the option to go to the previous screen if they dont want to use an account
                    style: 'cancel'
                }
            ],
            { cancelable: false });
    }

    //render the screen
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.screenHeader}>{utils.getRegionString(regionID)}</Text>
                    <Text style={styles.inputHeading}>Rating:</Text>
                    <View style={styles.textView}>
                        <Input 
                            style={styles.textInput}
                            pattern={'^[0-9]$'}
                            placeholder='Please enter a number between 1 and 5'
                            onChangeText={text => setReviewData(text)}
                            onValidation={result => setIsReviewValid(result)}/>
                    </View>
                    <Text style={styles.inputHeading}>Comment:</Text>
                    <View>
                        <View style={styles.commentView}>
                            <Input 
                                style={styles.textInput}
                                placeholder='Comment... (mandatory)'
                                pattern={'^.{1,100}$'}
                                onChangeText={text => setCommentData(text)}
                                onValidation={result => setIsCommentValid(result)}/>
                        </View>
                        <Text style={(commentData.length > 100)? styles.counterInvalid : styles.counterDefault}>{commentData.length} / 100</Text>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={submitButton}>
                        <Text style={styles.submitText}>Submit Rating</Text>
                    </TouchableOpacity>
                    <Button title='Cancel' onPress={pressHandler} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

//StylesSheet for the screen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'flex-start'
    },
    inputHeading: {
        fontWeight: 'bold'
    },
    screenHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 30
    },
    submitButton: {
        backgroundColor: 'dodgerblue',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20
    },
    submitText: {
        color: 'white',
        fontSize: 20
    },
    textInput: {
        padding: 10,
    },
    textView: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    commentView: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    counterDefault: {
        color: 'grey',
        textAlign: 'right'
    },
    counterInvalid: {
        color: 'red',
        textAlign: 'right'
    }
});