import { 
    FlatList,
    StyleSheet, 
    Text,
    TouchableOpacity, 
    View 
} from 'react-native';
import React, { useState } from 'react';
import * as fb from '../components/Firebase/firebase';
import { getRegionString } from '../components/misc/utilities';
import { ScrollView} from 'react-native-gesture-handler';


const Emoji = props => (                               //reusable code for emojis that wont cause errors
    <Text
        className = "emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style = {styles.ji}
    >
        {props.symbol}
    </Text>
);


export default function Region({navigation}) {


    //packet to be sent to Comment screen when clicked
    const [region] = useState([
        { key: 1,  regionID: regionID},
    ]);

    //set up and functions 
    let db = fb.fb.firestore();

    //case data
    const [current, setCurrent] = useState(-1);
    const [icu, seticu] = useState(-1);
    const [inpatient, setInpatient] = useState(-1);
    const [newCases, setNewCases] = useState(-1);
    const [recover, setRecover] = useState(-1);
    const [total, setTotal] = useState(-1);

    //max data
    const [Max, setMax] = useState(-1);
    
    //review data
    const [avg, setavg] = useState(-1);
    const [item, setItem] = useState([]);

    let regionID =  navigation.getParam('regionID')
    let regionName = getRegionString(regionID);

    //weighted data
    let Drating;
    //User percentage
    let Upercentage;
    //Government percentage
    let Gpercentage;
    //Emoji selector
    let emo;
    //Rating to be shown to Users
    let rating;


    if(Max == -1)                                     //stops additional reads when state updates.
    {                                                 //here to stop Freezing and lag issues

        //pull case file
        db.collection("cases").where("regionID", "==", regionID).orderBy("date", "desc").limit(1).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                setCurrent(doc.get("activeCases"));
                seticu(doc.get("icuHospitalizations"));
                setInpatient(doc.get("inpatientHospitalizations"));
                setNewCases(doc.get("newCases"));
                setRecover(doc.get("recoveredCases"));
                setTotal(doc.get("totalCases"));
                });
        })
        .catch((error) =>{ console.error (error.message); });


        //pull max cases
        db.collection("max-cases").doc(regionID.toString()).get().then((doc) => {
                setMax(doc.get("max"));
        })
        .catch((error) =>{ console.error (error.message); });   


        //pull reviews and sum
        db.collection("ratings").where("regionID", "==", regionID).orderBy("date", "desc").limit(10).get().then((snapshot) => {
                let z = snapshot.size;
                let x = 0;
                let y = [];
                snapshot.forEach((doc) => {
                x = doc.get("rating") + x;
                y.push({ userName:doc.data().userName, rating: doc.data().rating, comment: doc.data().comment, key: doc.id});
                })
                x = x/z;
                setavg(x);
                setItem(y);
        })
        .catch((error) =>{ console.error (error.message); });
    }


    if(isNaN(avg) == true)               //if there are no ratings set avg to 3 as to have no impact
    {
        setavg(3);
    }

    Gpercentage = current/Max;       //Government percent

    Upercentage = 1-(avg/5);        //invert it as high is bad in the mathematics

    Drating = .6 * Gpercentage + .4 *Upercentage; //weighted 60/40 towards Government data

    //Based on the percentage of the approval rating we assign a specific emoji. it is broken down into 10s
    //for the off chance that it is negative we have an error message so the rest of the data will show
    if(Drating >=.9)
    {
            emo = <Emoji symbol="🤮" label="everyhingSucks"/>
    }
    else if(Drating <.9 && Drating >=.8)
    {
            emo = <Emoji symbol="🤢" label="almostEverthingSucks"/>
    }
    else if(Drating <.8 && Drating >=.7)
    {
            emo = <Emoji symbol="🤒" label="yourProbablyGoingToGetSick"/>
    }
    else if(Drating <.7 && Drating >=.6)
    {
            emo = <Emoji symbol="🤧" label="BestToAvoidPeople"/>
    }
    else if(Drating <.6 && Drating >=.5)
    {
            emo = <Emoji symbol="😷" label="MaskIsn'tOptional"/>
    }
    else if(Drating <.5 && Drating >=.4)
    {
            emo = <Emoji symbol="😖" label="Notterrible"/>
    }
    else if(Drating <.4 && Drating >=.3)
    {
            emo = <Emoji symbol="☹️" label="BubbleBurst"/>
    }
    else if(Drating <.3 && Drating >=.2)
    {
            emo = <Emoji symbol="😐" label="bubbleHasn'tBurst" />
    }
    else if(Drating <.2 && Drating >=.1)
    {
            emo = <Emoji symbol="🙂" label="nearlyNormal" />
    }
    else if(Drating <.1)
    {
            emo = <Emoji symbol="😄" label="CovidWhatsThat?"/>
    }
    else
    {
            emo = <Text>error</Text>
    }



    rating = Math.floor((1- Drating)*100);


    //needs to be here as data isn't found until now
    //render Item for Flatlist to go through comments
    const renderItem = ({item}) => (
        <View style={styles.Concomm}>
            <Text style={styles.user}>{item.userName}  Rating: {item.rating}</Text>
            <Text>{item.comment}</Text>
        </View>   
    );


    //what the User will see
    return(
        <ScrollView>
            <View style = {styles.container}>
                <Text style = {styles.title}>{regionName}</Text>
                <View style = {styles.row}>
                    {emo} 
                    <Text style = {styles.HRating}>Approval rating: {rating}%</Text>
                </View>
                <View style = {styles.stats}>
                    <Text style = {styles.subTitle}>
                        Statistics
                    </Text>
                    <Text>
                        Current Cases: {current}
                    </Text>

                    <Text>
                        New Cases: {newCases}
                    </Text>

                    <Text>
                        ICU Cases: {icu}
                    </Text>

                    <Text>
                        Hospitalized Cases: {inpatient}
                    </Text>

                    <Text>
                        Recovered Cases: {recover}
                    </Text>

                    <Text>
                        Total Cases: {total}
                    </Text>

                    <Text>
                        Highest recorded Cases at one time: {Max}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Rating', {regionID: regionID})}>
                        <Text style={styles.button}>Add Rating.</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                data={item}
                renderItem={renderItem}
                />

            </View>
        </ScrollView>
    )
}

//bluebuttons for most thing default style otherwise
const styles = StyleSheet.create({
    container: {                         //Base format
        padding: 24,
        fontSize: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {                            //Title of page/region
        fontSize: 30,
        paddingLeft: 55,
        paddingRight: 55,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        width: 300,
        borderRadius: 6,
        textAlign: 'center',
        backgroundColor: '#3DA5E0',
    },
    HRating:                           //Header approval rating
    {
        fontSize: 20,
        width: 200,
        height: 70,
        paddingTop: 20,
        borderRadius: 6,
        textAlign: 'center',
        backgroundColor: '#3DA5E0',
    },

    subTitle:                        //Sub header
    {
        fontSize: 22,
        marginBottom: 10,
        borderBottomWidth: 1, 
        fontWeight: "bold",
        textAlign: 'center',
    },

    ji:                             //emoji
    {
        fontSize: 50,
        textAlign: 'left',
    },

    row:                           //align emoji and approval in a row format
    {
        fontSize: 30,
        paddingLeft: 55,
        paddingRight: 55,
        paddingTop: 10,
        paddingBottom: 10,
        height:90,
        flexDirection: "row",
        justifyContent: "center",
    },

    stats:                       //Format for government statistics
    {
        fontSize: 20,
        paddingTop: 20,
        fontSize: 20,
        padding: 10,
        borderRadius: 6,
        textAlign: 'center',
        backgroundColor: '#3DA5E0',
    },


    button: {                  //Pressable button
        fontSize: 20,
        paddingLeft: 55,
        paddingRight: 55,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#61dafb',
        width: 280,
        textAlign: 'left',
    },


    Concomm:                  //Comment format
    {
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        width: 280, 
        textAlign: 'left',
        backgroundColor: '#3DA5E0',
    },

    user: {                  //Username
        fontWeight: "bold",
    },

});