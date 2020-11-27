/*
 *  newsStack.js - COVID Guardian - CS 372 Project
 *  Purpose: Defines the stack structure that is used by react-naviation for the news related
 *           screens.
 * 
 *  Author: Changxuan Zhao
 */

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import News from '../screens/news';
import Header from '../shared/header';
import React from 'react';

const screens = {
    News: {
        screen: News,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
        }
    }
}

const NewsStack = createStackNavigator(screens);

export default createAppContainer(NewsStack);