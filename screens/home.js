import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Region');
    }

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
    }
});