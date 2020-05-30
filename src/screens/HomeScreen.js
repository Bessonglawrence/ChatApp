import React, {Component} from 'react';
import { SafeAreaView, View, Text,TouchableOpacity, FlatList, AsyncStorage, StyleSheet, } from 'react-native';
import firebase from 'firebase';
import User from '../components/User'

export default class HomeScreen extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	users:[],
	  };
	}

	static navigationOptions ={
		title: 'Chats'
	}

	componentDidMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added', (val) =>{
			let person = val.val();
			person.phone = val.key;
			if(person.phone === User.phone){
				User.name = person.name
			} else {
				this.setState((prevState) => {
					return {
						users:[...prevState.users, person]
					}
				})
			}
			
		})
	}

	_logOut = async() => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	}

	renderRow = ({item}) => {
		return(
			<TouchableOpacity 
				style={{padding: 10, borderBottomColor:'#ccc', borderBottomWidth: 1}}
				onPress={() => this.props.navigation.navigate('Chat', item)}
			>
				<Text style={{fontSize: 20}}>{item.name}</Text>
			</TouchableOpacity>
		)
	}

	render(){
		return(
			<SafeAreaView style={styles.container}>
				<FlatList 
					data={this.state.users}
					renderItem={this.renderRow}
					keyExtractor={(item) => item.phone}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#F5FCFF' 
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