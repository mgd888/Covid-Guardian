import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Region');
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title='Region View' onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        fontSize: 20,
    }
});