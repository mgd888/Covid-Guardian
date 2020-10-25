import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';

export default function Rating({navigation}) {

    const pressHandler = () => {
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <Text>Submit Rating for *Region*</Text>
            <Text>Rating:</Text>
            <TextInput style={styles.commentArea}/>
            <Text>Comment:</Text>
            <TextInput style={styles.commentArea}/>
            <Button title='Submit Rating'/>
            <Button title='Back to home' onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    commentArea: {
        backgroundColor: 'white'

    }
});