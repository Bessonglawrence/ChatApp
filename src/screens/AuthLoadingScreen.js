import React, {Component} from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	View
} from 'react-native';
import firebase from 'firebase';

import User from '../components/User';

export default class AuthLoadingScreen extends Component {
	constructor(props) {
	  super(props);
	  this._bootstrapAsync();
	}

	componentDidMount(){
		 // Your web app's Firebase configuration
		  var firebaseConfig = {
		    apiKey: "AIzaSyDAqeNgGtVxDNnmMnDMhAbG9eLqd9uxf3E",
		    authDomain: "fastfood-44be5.firebaseapp.com",
		    databaseURL: "https://fastfood-44be5.firebaseio.com",
		    projectId: "fastfood-44be5",
		    storageBucket: "fastfood-44be5.appspot.com",
		    messagingSenderId: "502206992452",
		    appId: "1:502206992452:web:06634d832e89178528ec11"
		  };
		  // Initialize Firebase
		  firebase.initializeApp(firebaseConfig);
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