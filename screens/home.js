/*
 *  home.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the home screen for the application
 * 
 *  Author: Changxuan Zhao
 */
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getRegionString } from '../components/misc/utilities';

export default function Home({navigation}) {
    //Create a region that will be used to render the buttons for each region
    const [region] = useState([
        { key: 1,  regionID: 0 },
        { key: 2,  regionID: 1 },
        { key: 3,  regionID: 2 },
        { key: 4,  regionID: 3 },
        { key: 5,  regionID: 4 },
        { key: 6,  regionID: 5 },
        { key: 7,  regionID: 6 },
        { key: 8,  regionID: 7 },
        { key: 9,  regionID: 8 },
        { key: 10, regionID: 9 },
        { key: 11, regionID: 10 },
        { key: 12, regionID: 11 },
        { key: 13, regionID: 12 },
    ]);
    
    //render the screen
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Saskatchewan Region Map</Text>
                </View>
                <Image style={styles.image} source={require('../assets/map.png')} />
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Region List</Text>
                    </View>
                <View style={styles.regionBox}>
                    { region.map((item) => {
                        return (
                            <View key={item.key}>
                                <TouchableOpacity onPress={() => navigation.navigate('Region', item)}>
                                    <Text style={styles.region}>{getRegionString(item.regionID)}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

//Define the styles for the screen
const styles = StyleSheet.create({
    container: {
        padding: 15,
        fontSize: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    image:{
        marginBottom: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 500
    },
    region: {
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 55,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#9FCFED',
        textAlign: 'center',
    },
    regionBox: {
        alignItems: 'stretch',
        flexDirection: 'column'

    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    titleBox: {
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});