/*
 *  news.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the news screen for the application
 * 
 *  Author: Jason Wolfe
 */
import React from 'react';
import { FlatList, Image, Linking, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function News() {
    const [refreshing, setRefreshing] = React.useState(false); //state variable to keep track if is currently refreshing
    const [listData, setListData] = React.useState(); //state variable to hold the array of articles from newsapi
    const [lastFetchedAt, setLastFetchedAt] = React.useState(0); //state variabke to hold the last time we fetched info from api


    /*
    * getNews()
    *   Fetch latest covid news articles in sask from NewsAPI and store in listData, plus update lastFetchedAt
    */
    function getNews() {
        var url = 'http://newsapi.org/v2/everything?' +
          'q="Saskatchewan"+"covid"&' +
          'sortBy=publishedAt&' +
          'domains=cbc.ca,reuters.com,ctvnews.ca,globalnews.ca&'+
          'excludeDomains=seekingalpha.com,japantoday.com,yahoo.com,prnewswire.com,iphoneincanada.ca,macleans.ca,thestar.com&' +
          'apiKey=afa19f898d38403f84d29b47a7414453';

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setLastFetchedAt(Date.now);
                setListData(json.articles);
            })
    }

    /*
    * onRefresh()
    *   Handler that is called when the news list is 'pulled to refresh'
    */
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        let nextRefresh = new Date(lastFetchedAt + 5*60000); //only allow refreshes every 5 mins

        if(Date.now > nextRefresh) //check to see if we need to fetch new data 
        {
            console.log('Fetching new data from API');
            getNews();
        }
        else 
        {
            console.log('Not fetching new data, please wait 5 minutes');
        }
        setRefreshing(false);
    }, [refreshing]);

    /*
    * renderItem({item]})
    *   used by the flatlist component to render each item of the listData array
    */
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <Image source={{uri: item.urlToImage}} style={styles.cardImage}/>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardSubtext}>{(item.description).replace(/(<([^>]+)>)/ig, '')}</Text>
                    <View style={styles.cardArticleInfo}>
                        <Text>{new Date(Date.parse(item.publishedAt)).toDateString()}</Text>
                        <Text>{item.source.name}</Text>
                    </View>
                </View>
            </View>   
        </TouchableOpacity>
    );

    //on initial load we need to fetch the new news items
    if(lastFetchedAt == 0)
        getNews();

    //render the screen
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recent COVID-19 News  </Text>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'key'+index}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}

//define the style for the screen
const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 25
    },
    cardArticleInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        borderTopColor: '#bfbfbf',
        borderTopWidth: 1,
    },
    cardContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRadius: 5
    },
    cardDetails: {
        flex: 1,
        flexDirection: 'column'
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    cardImage: {
        height: 80,
        width: 80,
        borderRadius: 5,
    },
    cardSubtext: {
        flex: 2,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '400',
        paddingLeft: 5,
        flex: 1,
        flexWrap: 'wrap'
    }
});