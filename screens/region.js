import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Region({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Rating');
    }

    return (
        <View style={styles.container}>
            <Text>Region Screen</Text>
            <Button title='Rating' onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});