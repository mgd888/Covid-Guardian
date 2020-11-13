import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getRegionString } from '../components/misc/utilities';

export default function Home({navigation}) {
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
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../source/assets/map.png')} />
                { region.map((item) => {
                    return (
                        <View key={item.key}>
                            <TouchableOpacity onPress={() => navigation.navigate('Region', item)}>
                                <Text style={styles.title}>{item. key}. {getRegionString(item.regionID)}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        fontSize: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image:{
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        paddingLeft: 55,
        paddingRight: 55,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#61dafb',
        width: 300,
        textAlign: 'left',
    }
});