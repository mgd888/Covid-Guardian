/*
 *  header.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the header (title) for the application
 * 
 *  Author: Changxuan Zhao
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {

    /*
    * openMenu()
    *   Handle when the user presses the menu button (open the drawer)
    */
    const openMenu = () => {
        navigation.openDrawer();
    }

    //render the component
    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>COVID Guardian</Text>
            </View>
        </View>
    );
}

//Define the style or the header
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
    },
    icon: {
        position: 'absolute',
        right: (Platform.OS === 'android') ? 350 : 280,
    }
});