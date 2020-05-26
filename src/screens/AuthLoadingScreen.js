import React, {Component} from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	View
} from 'react-native';

import User from '../components/User'

export default class AuthLoadingScreen extends Component {
	constructor(props) {
	  super(props);
	  this._bootstrapAsync();
	}

	// Fetch the token from the storage then navigate.

	_bootstrapAsync = async () => {
		User.phone = await AsyncStorage.getItem('usePhone');

		// this will switch to the App screen or Auth screen
		this.props.navigation.navigate(User.phone ? 'App' : 'Auth')
	};

	render(){
		return(
			<View> 
				<ActivityIndicator />
				<StatusBar barStyle='default' />
			</View>
		);
	}
}