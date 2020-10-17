import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Header from '../shared/header';
import React from 'react';
import Subheader from '../shared/subheader';


const screens = {
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Subheader navigation={navigation} />,
            };
        }
    }
}

const AccountStack = createStackNavigator(screens);

export default createAppContainer(AccountStack);