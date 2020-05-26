import React, {Component} from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'


const AppStack = createStackNavigator({Home: HomeScreen});
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
