import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Profile from '../screens/profile';
import Header from '../shared/header';
import React from 'react';


const screens = {
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            };
        }
    }
}

const ProfileStack = createStackNavigator(screens);

export default createAppContainer(ProfileStack);