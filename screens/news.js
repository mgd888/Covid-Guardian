import React from 'react';
import { 
    ActivityIndicator,
    Button, 
    FlatList,
    Image,
    Linking,
    RefreshControl,
    StyleSheet, 
    Text,
    TouchableOpacity, 
    View 
} from 'react-native';

const dummyData = JSON.parse("{\"articles\": [{\"author\": \"Romain Dillet\",\"title\": \"PayPal to let you buy and sell cryptocurrencies in the US\",\"url\": \"http://techcrunch.com/2020/10/21/paypal-to-let-you-buy-and-sell-cryptocurrencies-in-the-us/\",\"urlToImage\": \"https://techcrunch.com/wp-content/uploads/2020/07/GettyImages-887657568.jpg?w=600\",\"publishedAt\": \"2020-10-21T13:28:15Z\"},{\"author\": \"Zack Whittaker\",\"title\": \"DOJ says it seized over $1 billion in bitcoin from the Silk Road drugs marketplace\",\"url\": \"http://techcrunch.com/2020/11/05/justice-department-silk-road-billion-bitcoin/\",\"urlToImage\": \"https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-887657568.jpg?w=600\",\"publishedAt\": \"2020-11-05T17:17:41Z\"}]}");

export default function News() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [listData, setListData] = React.useState();

    let lastFetchedAt;

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
                lastFetchedAt = new Date();
                setListData(json.articles);
                console.log(json);
            })
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        let nextRefresh = new Date(lastFetchedAt.getTime() + 5*60000); //only allow refreshes every 5 mins

        if(Date.now > nextRefresh)
        {
            console.log('Fetching new data from API');
            getNews();
        }
        else 
        {
            console.log('Not fetching new data, please wait 5 minutes');
        }

        
        // if (listData.length < 10) {
        //   try {
        //     let response = await fetch(
        //       'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms',
        //     );
        //     let responseJson = await response.json();
        //     console.log(responseJson);
        //     setListData(responseJson.result.concat(initialData));
        //     setRefreshing(false)
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
        // else{
        //   ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
        //   setRefreshing(false)
        // }
        console.log("refreshed");
        setRefreshing(false);
    }, [refreshing]);

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

    if(lastFetchedAt == null)
        getNews();

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
        //backgroundColor: 'blue',
        flex: 1,
        flexWrap: 'wrap'
    }
});