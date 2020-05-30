

import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'


const AppStack = createStackNavigator({Home: HomeScreen, Chat: ChatScreen});
const AuthStack = createStackNavigator({Login: Login});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }

));