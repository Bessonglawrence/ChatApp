import React, {Component} from 'react';
import { View, Text,TouchableOpacity, AsyncStorage, StyleSheet, } from 'react-native';
import User from '../components/User'

export default class HomeScreen extends Component {

	static navigationOptions ={
    	header: null
  	}

	_logOut = async() => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>
					{User.phone}
				</Text>

				<TouchableOpacity onPress={this._logOut} style={styles.button}>
					<Text style={styles.buttonText}>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		alignItems: 'center'
	},
	button: {
		alignItems: 'center',
	    justifyContent: 'center',
	    height: 43,
	    width: '80%',
	    borderRadius: 5,
	    borderWidth: 1,
	    borderColor: 'lightblue',
	},
	buttonText: {
	    color: 'grey',
	    fontSize: 20,
	    fontStyle: 'italic',
  	}
});