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

  static navigationOptions ={
    header: null
  }

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
    if(phone.length < 9 && name.length < 3){
      Alert.alert('Error', 'Phone number must be  equal to or greater 9 digits','name must be greater than 3 characters');
    } else if( phone.length >= 9 && name.length < 3) {
      Alert.alert('Error', 'Name must be 3 characters or more')
    } else if (phone.length < 9 && name.length >= 3) {
      Alert.alert('Error', 'Phone number must be greater than 9 digits')
    } else {
      // save user data
      await AsyncStorage.setItem('userPhone', phone)
      User.phone = phone;
      this.props.navigation.navigate('App')
    }
    
  }

  render(){
    const { phone, name }= this.state;
    return (

      <View style={styles.container}>

        <View style={styles.loginView}>
          <Text style={styles.loginText}>LOGIN</Text>
        </View>

        <TextInput
          keyboardType='number-pad'
          placeholder= "Phone number"
          style={styles.input}
          value={phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder= "Name"
          style={styles.input}
          value={name}
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
  },
  loginText:{
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'lightblue'
  },
  loginView:{
    marginBottom: 15
  }

});