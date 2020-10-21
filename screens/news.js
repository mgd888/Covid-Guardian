import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function News() {
    return (
        <View style={styles.container}>
            <Text>News Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});