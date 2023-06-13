import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/formlogin/FormLogin'
import { auth } from '../firebase/config'


export default class Login extends Component {
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }
  render() {
    return (
      <View>
        <Text>Login</Text>
        <FormLogin navigation={this.props.navigation} />
        <Text>
            Don't have an account?
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Register')}
            >
                <Text>Click here</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}