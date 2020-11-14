import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

<<<<<<< Updated upstream
export default function Contact() {
    return (
        <View style={styles.container}>
            <Text>Contact Screen</Text>
        </View>
    );
=======
export default class App extends Component {
    makeCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android')
        {
            phoneNumber = 'tel:${811}';
        }
        else
        {
            phoneNumber = 'telprompt:${}';
        }
        Linking.openURL(phoneNumber);
    };

    render() {
        return (
            <ImageBackground style={styles.background} source={require('../source/assets/shot.jpg')} resizeMode='stretch'>
                <View style={styles.container}>
                    <Text style={styles.text}>For the most up-to-date information and risk level in Saskatchewan, visit 
                        <Text style={{color: 'blue'}} onPress={() => {Linking.openURL('https://www.saskatchewan.ca/government/health-care-administration-and-provider-resources/treatment-procedures-and-guidelines/emerging-public-health-issues/2019-novel-coronavirus/cases-and-risk-of-covid-19-in-saskatchewan')}}>
                        {" "}Cases and Risk of COVID-19 in Saskatchewan</Text>.
                    </Text>
                        
                    <Text style={styles.text}>For self assessment tool and testing information, visit
                        <Text style={{color: 'blue'}} onPress={() => {Linking.openURL('https://www.saskatchewan.ca/covid-19#utm_campaign=q2_2015&utm_medium=short&utm_source=%2Fcovid-19')}}>
                        {" "}the Government of Saskatchewan's ​COVID-19​ webpage</Text>.
                    </Text>
                    
                    <Text style={styles.text}>If you have any concerns related to COVID-19, please call health line
                        <Text onPress={this.makeCall} style={styles.phone}> 811</Text> within Saskatchewan.
                    </Text>
                </View>
            </ImageBackground>
        );
    } 
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});