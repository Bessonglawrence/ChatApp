import React, {Component} from 'react';
import { 
	SafeAreaView, 
	Text, 
	TextInput, 
	View, 
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import firebase from 'firebase';
import User from '../components/User';

export default class ChatScreen extends Component {

	static navigationOptions = ({ navigation }) =>{
		return {
			title: navigation.getParam('name', null)
		}
		
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	person:{
	  		name: props.navigation.getParam('name'),
	  		phone: props.navigation.getParam('phone')
	  	},
	  	textMessage: '',
	  	messageList: []
	  };
	}

	handleChange = key => val =>{
		this.setState({ [key]: val })
	}

	sendMessage = async () =>{
		const { textMessage, person } = this.state;
		if(textMessage.length > 0){
			let msgId = firebase.database().ref('messages').child(User.phone).child(person.phone).push().key;
			let updates = {};
			let message = {
				message: textMessage,
				time: firebase.database.ServerValue.TIMESTAMP,
				from: User.phone
			}
			updates['messages/' + User.phone + '/' + person.phone + msgId] = message;
			updates['messages/' + person.phone + '/' + User.phone + msgId] = message;
			firebase.database().ref().update(updates);
			this.setState({ textMessage: '' });
		}
	}

	componentDidMount(){
		firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
			.on('child_added', (value)=>{
				this.setState((prevState)=>{
					return{
						messageList: [...prevState.messageList, value.val() ]
					}
				})
			})
	}

	renderRow = ({item}) =>{
		return(
			<View 
				style={{
					flexDirection:'row', 
					width:'60%',
					alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
					backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
					borderRadius: 5,
					marginBottom: 10
				}}
			>
			<Text style={{color:'#fff',padding: 7, fontSize: 16}}>
				{item.message}
			</Text>

			<Text style={{color: '#eee',padding: 3, fontSize: 12 }}>
				{item.time}
			</Text>
				
			</View>
		);
	}
	render(){
		let { height, width } = Dimensions.get('window');
		return(
			<SafeAreaView>
				<FlatList
					style={{padding: 10, height: height * 0.8}}
					data={this.state.messageList}
					renderItem={this.renderRow}
					keyExtractor={(item, index)=> index.toString()} 
				/>
				<View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 8}}>
					<TextInput
						placeholder="Type Message ..."
						style={styles.textInput}
						value={this.state.textMessage}
						onChangeText={this.handleChange('textMessage')}
					/>
					<TouchableOpacity onPress={this.sendMessage} style={styles.button}>
						<Text style={styles.btnText}> Send </Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	textInput:{
		height: 43,
		width: '80%',
		borderWidth: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'lightblue',
		paddingTop: 6,
		fontSize: 17,
		color: 'grey'
	},
	btnText:{
		fontSize: 18,
		fontStyle: 'italic',
	},
	button:{
		padding: 5,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'lightblue',
		marginLeft: 7
	}
});