import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import AccountStack from './accountStack';
import NewsStack from './newsStack';
import ContactStack from './contactStack';
import ProfileStack from './profileStack';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name="home" size={18} color={tintColor} />
        }
    },
    Account:{
        screen: AccountStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="login" size={18} color={tintColor} />
        }
    },
    News: {
        screen: NewsStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="newspaper" size={18} color={tintColor} />
        }
    },
    Contact: {
        screen: ContactStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name="link" size={18} color={tintColor} />
        }
    }
    /*Profile: {
        screen: ProfileStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name="user" size={18} color={tintColor} />
        }
    }*/
});

export default createAppContainer(RootDrawerNavigator);