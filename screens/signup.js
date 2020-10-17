import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Signup() {
    return (
        <View style={styles.container}>
            <Text>Sign up Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});