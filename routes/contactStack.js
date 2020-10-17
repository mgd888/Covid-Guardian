import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Contact from '../screens/contact';
import Header from '../shared/header';
import React from 'react';


const screens = {
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
        }
    }  
}

const ContactStack = createStackNavigator(screens);

export default createAppContainer(ContactStack);