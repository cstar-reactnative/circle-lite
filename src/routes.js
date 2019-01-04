import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './scenes/home';
import Confirm from './scenes/confirm';
import Details from './scenes/details';

const Stack = createStackNavigator({
    Home: {
        screen: Home,
    },
    Confirm: {
        screen: Confirm
    },
    Details: {
        screen: Details
    }
},
    {
        headerMode: 'none',
    });

const Rootc = createAppContainer(Stack);

export default class App extends Component {
    render() {
        return (
            <Rootc />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
