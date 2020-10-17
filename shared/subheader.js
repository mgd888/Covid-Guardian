import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Subheader({ navigation }) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>COVID Guardian</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    }
});