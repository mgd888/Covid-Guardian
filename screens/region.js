import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { max } from 'react-native-reanimated';
import * as fb from '../components/Firebase/firebase';
import * as utils from '../components/misc/utilities';




const Emoji = props => (                               //reusable code for emojis that wont cause errors
    <Text
        className = "emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </Text>
);

function getRegionID(region) {          //finds region id by name. reusable
    let result;
    switch (region) {
        case 'Far North West':
            result = 0;
            break;

        case 'Far North Central':
            result = 1;
            break;

        case 'Far North East':
            result = 2;
            break;

        case 'North West':
            result = 3;
            break;

        case 'North Central':
            result = 4;
            break;

        case 'North East':
            result = 5;
            break;

        case 'Saskatoon':
            result = 6;
            break;

        case 'Central West':
            result = 7;
            break;

        case 'Central East':
            result = 8;
            break;

        case 'Regina':
            result = 9;
            break;

        case 'South West':
            result = 10;
            break;

        case 'South Central':
            result = 11;
            break;

        case 'South East':
            result = 12;
            break;

        default:
            result = -1;
            break;


    }
    return result;
}

function getRegionNME () {           //will be uneeded at a later point as I will get the name from the previous page
    let result;
    result = "Regina";
    return result;
}

function GetMaxCases()              // looks at current cases against max recorded. will need to store max in the database for permenancy
{
    let current = 12;
    let max = 10
    if(current > max)
    {
        max = current;
    }
    return max;
}

function GetCurrent(regionID)
{
    let current = regionID;             //will use ID to find the correct datapoint
    return current;
}

function AvgRating(regionID)           //calc avg rating will eventually go through all saved review scores
{   
    let x = regionID;
    let sum = 0;
    for (let i = 0; i < x; i++) {
        sum++;
    }

        /*       Uncomment when Reviews are completed
    db.collection("reviews").where("regionID", "==", regionID).orderBy("date", "desc").limit(10).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            ReviewInfo = doc.data();
        });
    })
    .catch((error) =>{ console.error (error.message); });
    */


    return sum/x;
}

export default function Region({navigation}) {


    //let ReviewInfo;
    let db = fb.fb.firestore();
    const [current, setCurrent] = useState(-1);
    const [Max, setMax] = useState(-1);
    let regionN = getRegionNME();
    let regionID = getRegionID(regionN);

    db.collection("cases").where("regionID", "==", regionID).orderBy("date", "desc").limit(1).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          setCurrent(doc.get("activeCases"));
        });
    })
    .catch((error) =>{ console.error (error.message); });

    /*       Uncomment when Reviews are completed
    db.collection("reviews").where("regionID", "==", regionID).orderBy("date", "desc").limit(10).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            ReviewInfo = doc.data();
        });
    })
    .catch((error) =>{ console.error (error.message); });
    */

   db.collection("max-cases").doc(regionID.toString()).get().then((doc) => {
        setMax(doc.get("max"));
    })
    .catch((error) =>{ console.error (error.message); });   

    let Gpercentage = current/Max;       //Government percent       with current setup should be 9/12 = 0.75

    let avg = AvgRating(regionID);                                       // 1
    let Upercentage = 1-(avg/5);

    let Drating;  //weighted towards government
    Drating = .6 * Gpercentage + .4 *Upercentage; //weighted 60/40

    let emo;

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
            emo = <Emoji symbol="😐" label="bubbleHasn'tBurst"/>
    }
    else if(Drating <.2 && Drating >=.1)
    {
            emo = <Emoji symbol="🙂" label="nearlyNormal"/>
    }
    else if(Drating <.1)
    {
            emo = <Emoji symbol="😄" label="CovidWhatsThat?"/>
    }
    else
    {
            emo = <Text>error</Text>
    }
    return(
        <View>
            {emo}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});