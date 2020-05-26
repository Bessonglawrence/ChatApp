import React,{ Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import User from '../components/User'


export default class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      phone: '',
      name: ''
    };
  }

  handleChange = key => value => {
    this.setState({ [key]: value })
  }

  componentWillMount(){
    AsyncStorage.getItem('userPhone')
    .then(val =>{
      if(val){
        this.setState({phone: val})
      }
    })
  }

  submitForm = async () => {
    const { phone, name }= this.state;
    if(phone.length < 9){
      Alert.alert('Error', 'Phone number must be 9 digits and above')
    } else if( name.length < 3) {
      Alert.alert('Error', 'Name must be 3 characters or more')
    }
    // save user data
    await AsyncStorage.setItem('userPhone', phone)
    user.phone = phone;
    this.props.navigation.navigate('App')
  }

  render(){
    return (

      <View style={styles.container}>
        <TextInput
          keyboardType='number-pad'
          placeholder= "Phone number"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder= "Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />

        <TouchableOpacity onPress={this.submitForm} style={styles.button}>
          <Text style={styles.buttonText}>
            Enter
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input:{
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc", 
    width: '90%',
    marginBottom: 10, 
    borderRadius: 5
  },
  button:{
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