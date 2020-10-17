import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Login({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title='Sign up' onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});