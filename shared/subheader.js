/*
 *  header.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the subheader component. Used for title on some screens.
 * 
 *  Author: Changxuan Zhao
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Subheader({ navigation }) {
    //render the subheader component
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>COVID Guardian</Text>
            </View>
        </View>
    );
}

//define the style for the sub header
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