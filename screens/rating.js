import React, {useState} from 'react';
import { 
    Alert,
    Button, 
    Keyboard,
    KeyboardAvoidingView, 
    Platform,
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import * as fb from '../components/Firebase/firebase';
import * as utils from '../components/misc/utilities';

export default function Rating(props) {

    const [commentData, setCommentData] = useState(''); //add commentData to state
    const [reviewData, setReviewData] = useState(-1); //add reviewData to state

    const regionID = props.navigation.getParam('regionID', -1); //get the regionID from props. default to -1 if not passed


    const pressHandler = () => {
        props.navigation.pop();
    }

    const submitButton = () => {

        /*TODO: DO ERROR CHECKING
            -check that regionID is not -1
            -check that ratingsData is a valid number
            -check that commentData is under 150?? characters
            -check that the user is authenticated

            -send review to firestore
            --if success: show message that says review sucessfully submitted
            --else: show message containing error
        */

        //create an object containing the review data
        var data = {
            comment: commentData,
            date: fb.fb.firestore.Timestamp.now(),
            rating: reviewData,
            regionID: regionID,
            userID: "1"
        };

        console.log(data);

        let db = fb.fb.firestore();

        //TODO: Uncomment when prod ready

        // db.collection('ratings').doc().set(data).then(() => {
        //     Alert.alert('Success!', 'Your review has been submitted. Thank you for your input!');
        //     props.navigation.pop();
        // }).catch((error) => {
        //     Alert.alert('Unable to submit review', error.message);
        //     console.error('an error has occured with submitting the review: ' + error.code);
        // });
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.screenHeader}>{utils.getRegionString(regionID)}</Text>

                    <Text style={styles.inputHeading}>Rating:</Text>
                    <View style={styles.textView}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder='Please enter a number between 0 and 5'/>
                    </View>
                    <Text></Text>

                    <Text style={styles.inputHeading}>Comment:</Text>
                    <View style={styles.textView}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder='Comment...'
                            onChangeText={(text) => setCommentData(text)}/>
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
        height: 20,
    },
    textView: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        padding: 10
    }
});