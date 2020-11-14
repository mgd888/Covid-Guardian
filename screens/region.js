import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as fb from '../components/Firebase/firebase';
import { getRegionString } from '../components/misc/utilities';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


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




function AvgRating(regionID)           //calc avg rating will eventually go through all saved review scores
{   

    let x = regionID;
    let sum = 0;
    for (let i = 0; i < x; i++) {
        sum++;
    }
    /* Test when there is 10 reviews
    let sum;
    const [Output, setavg] = useState(-1);
    db.collection("reviews").where("regionID", "==", regionID).orderBy("date", "desc").limit(10).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            sum = doc.get("rating") + sum;
        })
        setavg(sum);
    })
    .catch((error) =>{ console.error (error.message); });

    return Output/10;
    */
   if(sum/x == NaN)
   {
        return 0;
   }
   else
   {
        return sum/x;
   }
}

export default function Region({navigation}) {

    //set up and functions 
    let db = fb.fb.firestore();
    const [current, setCurrent] = useState(-1);
    const [icu, seticu] = useState(-1);
    const [inpatient, setInpatient] = useState(-1);
    const [newCases, setNewCases] = useState(-1);
    const [recover, setRecover] = useState(-1);
    const [total, setTotal] = useState(-1);
    const [Max, setMax] = useState(-1);
    let regionID =  navigation.getParam('regionID')
    let regionName = getRegionString(regionID);


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

   db.collection("max-cases").doc(regionID.toString()).get().then((doc) => {
        setMax(doc.get("max"));
    })
    .catch((error) =>{ console.error (error.message); });   

    let Gpercentage = current/Max;       //Government percent       with current setup should be 9/12 = 0.75

    let avg = AvgRating(regionID);                                       // 1
    console.log(avg);
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