/*
 *  region.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the region screen for the application
 * 
 *  Author: David Lee
 */
import React, { useState } from 'react';
import { StyleSheet, Text,TouchableOpacity, View } from 'react-native';

import { ScrollView} from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import * as fb from '../components/Firebase/firebase';
import { getRegionString } from '../components/misc/utilities';


const Emoji = props => (     //reusable code for emojis that wont cause errors
    <Text
        className = "emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style = {styles.ji}>
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
    const [date, setDate] = useState(-1);

    //max data
    const [Max, setMax] = useState(-1);
    
    //review data
    const [avg, setavg] = useState(-1);
    const [item, setItem] = useState([]);

    let regionID =  navigation.getParam('regionID'); //get regionID from the passed parameters to screen
    let regionName = getRegionString(regionID); //get string version of regionID

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
    //colour for danger scale
    let dsColor;


    if(Max == -1)                                     //stops additional reads when state updates.
    {                                                 //here to stop Freezing and lag issues

        //pull case file from Firebase
        db.collection("cases").where("regionID", "==", regionID).orderBy("date", "desc").limit(1).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    setCurrent(doc.get("activeCases"));
                    seticu(doc.get("icuHospitalizations"));
                    setInpatient(doc.get("inpatientHospitalizations"));
                    setNewCases(doc.get("newCases"));
                    setRecover(doc.get("recoveredCases"));
                    setTotal(doc.get("totalCases"));
                    setDate(doc.get("date").toDate().toDateString());
                });
        })
        .catch((error) => { console.error (error.message); });


        //pull max cases for region from firebase
        db.collection("max-cases").doc(regionID.toString()).get().then((doc) => {
                setMax(doc.get("max"));
        })
        .catch((error) => { console.error (error.message); });   


        //pull reviews from firebase and sum the results
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
        .catch((error) => { console.error (error.message); });
    }


    if(isNaN(avg) == true)               //if there are no ratings set avg to 3 as to have no impact
    {
        setavg(3);
    }

    Gpercentage = current/Max;       //Government percent

    Upercentage = 1-(avg/5);        //invert it as high is bad in the mathematics

    Drating = .6 * Gpercentage + .4 *Upercentage; //weighted 60/40 towards Government data

    dsColor = '#e8e8e8'; //default color for the box

    //Based on the percentage of the approval rating we assign a specific emoji. it is broken down into 10s
    //for the off chance that it is negative we have an error message so the rest of the data will show
    if(Drating >=.9)
    {
        emo = <Emoji symbol="🤮" label="everyhingSucks"/>;
        dsColor = '#ffa8a8';
    }
    else if(Drating <.9 && Drating >=.8)
    {
        emo = <Emoji symbol="🤢" label="almostEverthingSucks"/>;
        dsColor = '#ffa8a8';
    }
    else if(Drating <.8 && Drating >=.7)
    {
        emo = <Emoji symbol="🤒" label="yourProbablyGoingToGetSick"/>;
        dsColor = '#ffa8a8';
    }
    else if(Drating <.7 && Drating >=.6)
    {
        emo = <Emoji symbol="🤧" label="BestToAvoidPeople"/>;
        dsColor = '#ffe2a8';
    }
    else if(Drating <.6 && Drating >=.5)
    {
        emo = <Emoji symbol="😷" label="MaskIsntOptional"/>;
        dsColor = '#ffe2a8';
    }
    else if(Drating <.5 && Drating >=.4)
    {
        emo = <Emoji symbol="😖" label="Notterrible"/>;
        dsColor = '#ffe2a8';
    }
    else if(Drating <.4 && Drating >=.3)
    {
        emo = <Emoji symbol="☹️" label="BubbleBurst"/>;
        dsColor = '#ffe2a8';
    }
    else if(Drating <.3 && Drating >=.2)
    {
        emo = <Emoji symbol="😐" label="bubbleHasntBurst" />;
        dsColor = '#bbffa8';
    }
    else if(Drating <.2 && Drating >=.1)
    {
        emo = <Emoji symbol="🙂" label="nearlyNormal" />;
        dsColor = '#bbffa8';
    }
    else if(Drating <.1)
    {
        emo = <Emoji symbol="😄" label="CovidWhatsThat?"/>;
        dsColor = '#bbffa8';
    }
    else
    {
        emo = <Text>error</Text>
    }

    /*
    * rowStyle()
    *   Define a dynamic custom style that is used for the box behind the emoji and percentage
    *   This needs to be defined as a function because 'dsColor' changes based upon the calcuated 
    *   values above.
    */
    const rowStyle = () => {
        return {
            fontSize: 30,
            paddingVertical: 10,
            height:90,
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: dsColor, //bad: ffa8a8 med: ffe2a8 good: bbffa8
            shadowColor: 'grey',
            shadowOpacity: 0.4,
            shadowRadius: 10,
        };
    };
    
    rating = Math.floor((1- Drating)*100); //get the rating percentage for screen

    //what the User will see
    return(
        <>
            <ScrollView>
                <View style = {styles.container}>
                    <Text style = {styles.title}>{regionName}</Text>
                    <View style = {rowStyle()}>
                        {emo} 
                        <Text style = {styles.HRating}>Approval rating: {rating}%</Text>
                    </View>
                        <Text style = {styles.subTitle}>
                            Statistics
                        </Text>
                    <View style = {styles.stats}>
                        <Text>
                            Active Cases: {current}
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
                            Highest Recorded Cases at One Time: {Max}
                        </Text>

                        <Text style={styles.caseDate}>Reported on: {date}</Text>
                    </View>
                    <Text style = {styles.subTitle}>
                            Ratings
                    </Text>
                    {item.length > 1?  //Check to see if there are reviews
                    item.map((review) => (
                        <View style={styles.Concomm} key={review.key}>
                            <Text style={styles.user}>{review.userName} - Rating: {review.rating}</Text>
                            <Text>{review.comment}</Text>
                        </View>  
                    ))
                    ://No raitings
                    (<Text>No ratings :(</Text>)}

                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rating', {regionID: regionID})}>
                <MaterialCommunityIcons name="pencil-plus" size={24} color="white" />
            </TouchableOpacity>
        </>
    )
}

//Define the style for the screen
const styles = StyleSheet.create({
    container: {                         //Base format
        padding: 15,
        paddingBottom: 85, //so the floating comment button doesnt cover the last comment
        fontSize: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'stretch'
    },
    title: {                            //Title of page/region
        fontSize: 30,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        borderRadius: 6,
        textAlign: 'center',
    },
    HRating:                           //Header approval rating
    {
        fontSize: 20,
        width: 200,
        height: 70,
        paddingTop: 20,
        borderRadius: 6,
        textAlign: 'center',
    },
    subTitle:                        //Sub header
    {
        fontSize: 22,
        marginVertical: 15,
        borderBottomWidth: 1, 
        fontWeight: "bold",
        textAlign: 'center',
    },
    ji:                             //emoji
    {
        fontSize: 50,
        textAlign: 'left',
    },
    stats:                       //Format for government statistics
    {
        fontSize: 20,
        paddingTop: 20,
        fontSize: 20,
        padding: 10,
        borderRadius: 6,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    button: {                  //Pressable button
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 20,                                                    
        right: 20,
        height:70,
        backgroundColor:'dodgerblue',
        borderRadius:100,
        zIndex: 1
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
    },
    Concomm:                  //Comment format
    {
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        textAlign: 'left',
        backgroundColor: '#9FCFED',
    },
    user: {                  //Username
        fontWeight: "bold",
    },
    caseDate: {
        fontStyle: 'italic', 
        marginTop: 10
    }

});