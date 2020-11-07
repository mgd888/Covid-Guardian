import React from 'react';
import { 
    Button, 
    FlatList,
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

const dummyData = JSON.parse("{\"articles\": [{\"author\": \"Romain Dillet\",\"title\": \"PayPal to let you buy and sell cryptocurrencies in the US\",\"url\": \"http://techcrunch.com/2020/10/21/paypal-to-let-you-buy-and-sell-cryptocurrencies-in-the-us/\",\"urlToImage\": \"https://techcrunch.com/wp-content/uploads/2020/07/GettyImages-887657568.jpg?w=600\",\"publishedAt\": \"2020-10-21T13:28:15Z\"},{\"author\": \"Zack Whittaker\",\"title\": \"DOJ says it seized over $1 billion in bitcoin from the Silk Road drugs marketplace\",\"url\": \"http://techcrunch.com/2020/11/05/justice-department-silk-road-billion-bitcoin/\",\"urlToImage\": \"https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-887657568.jpg?w=600\",\"publishedAt\": \"2020-11-05T17:17:41Z\"}]}");

export default function News() {
    function getNews() {
        var url = 'http://newsapi.org/v2/everything?' +
          'q=Saskatchewan&' +
          'sortBy=popularity&' +
          'apiKey=afa19f898d38403f84d29b47a7414453';

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
    }

    const renderItem = ({item}) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
        </View>   
    );

    console.log(dummyData);
    return (
        <View style={styles.container}>
            <Button onPress={getNews} title='test'/>
            <FlatList
                data={dummyData.articles}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },

    card: {
        marginBottom: 20,
        backgroundColor: 'red',
        shadowRadius: 10,
        shadowColor: 'grey',
        shadowOpacity: 1.0
    },

    title: {
        fontSize: 14,
        backgroundColor: 'blue'
    }
});