import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { max } from 'react-native-reanimated';


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

function getRegionID(region) {
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

function AvgRating(regionID)
{
    let x = regionID;
    let sum = 0;
    for (let i = 0; i < x; i++) {
        sum++;
    }
    return sum/x;
}

export default function Region({navigation}) {

    const pressHandler = () => {
        navigation.navigate('Rating');
    }



    let regionN = getRegionNME();
    let regionID = getRegionID(regionN);
    let Max = GetMaxCases();
    let current = GetCurrent(regionID);

    let Gpercentage = current/Max;       //Government percent       with current setup should be 9/12 = 0.75

    let avg = AvgRating(regionID);                                       // 1
    Upercentage = 1-(avg/10);

    let Drating;  //weighted towards government
    Drating = .6 * Gpercentage + .4 *Upercentage; //weighted 60/40


    if(Drating >=.9)
    {
        return(
            <View style={styles.container}>
                <Emoji symbol="🤮" label="everyhingSucks"/>
            </View>
        );
    }
    else if(Drating <.9 && Drating >=.8)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="🤢" label="almostEverthingSucks"/>
            </View>
        );
    }
    else if(Drating <.8 && Drating >=.7)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="🤒" label="yourProbablyGoingToGetSick"/>
            </View>
        );
    }
    else if(Drating <.7 && Drating >=.6)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="🤧" label="BestToAvoidPeople"/>
            </View>
        );
    }
    else if(Drating <.6 && Drating >=.5)
    {
        return(
            <View style={styles.container}>
                <Emoji symbol="😷" label="MaskIsn'tOptional"/>
            </View>
        );
    }
    else if(Drating <.5 && Drating >=.4)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="😖" label="Notterrible"/>
            </View>
        );
    }
    else if(Drating <.4 && Drating >=.3)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="☹️" label="BubbleBurst"/>
            </View>
        );
    }
    else if(Drating <.3 && Drating >=.2)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="😐" label="bubbleHasn'tBurst"/>
            </View>
        );
    }
    else if(Drating <.2 && Drating >=.1)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="🙂" label="nearlyNormal"/>
            </View>
        );
    }
    else if(Drating <.1)
    {
        return(
            <View style={styles.container}>
                    <Emoji symbol="😄" label="CovidWhatsThat?"/>
            </View>
        );
    }
    else
    {
        return(
            <View>
                <Text>how did you get here?</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});