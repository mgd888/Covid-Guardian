import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Rating({navigation}) {

    const pressHandler = () => {
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <Text>Rating Screen</Text>
            <Button title='Back to home' onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});