import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    log(mail, password){
        auth.signInWithEmailAndPassword(mail, password)
        .then(resp => this.props.navigation.navigate('Home'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <TextInput
            placeholder='Your email'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={(text)=> this.setState({email: text})}
        />
        <TextInput
            placeholder='Your password'
            keyboardType='default'
            value={this.state.password}
            onChangeText={(text)=> this.setState({password: text})}
            secureTextEntry={true}
        />
        <TouchableOpacity
            onPress={() => this.log(this.state.email, this.state.password)}
        >
            <Text>Log in</Text>

        </TouchableOpacity>
      </View>
    )
  }
}