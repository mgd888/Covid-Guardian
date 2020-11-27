/*
 *  homeStack.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the stack structure that is used by react-naviation for the home related
 *           screens.
 * 
 *  Author: Changxuan Zhao
 */

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Region from '../screens/region';
import Rating from '../screens/rating';
import Header from '../shared/header';
import Subheader from '../shared/subheader';
import React from 'react';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
            
        }
    },
    Region: {
        screen: Region,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Subheader navigation={navigation} />,
            };
        }
    },
    Rating: {
        screen: Rating,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Subheader navigation={navigation} />,
            };
        }
    } 
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);