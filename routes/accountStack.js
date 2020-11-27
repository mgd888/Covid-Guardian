/*
 *  accountStack.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the stack structure that is used by react-naviation for the account related
 *           screens.
 * 
 *  Author: Changxuan Zhao
 */

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Profile from '../screens/profile';
import Header from '../shared/header';
import React from 'react';
import Subheader from '../shared/subheader';


const screens = {
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
        }
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Subheader navigation={navigation} />,
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