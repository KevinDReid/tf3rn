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
      <View style={styles.container}>
        <TextInput style={styles.center}
            placeholder='Your email'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={(text)=> this.setState({email: text})}
        />
        <TextInput style={styles.center}
            placeholder='Your password'
            keyboardType='default'
            value={this.state.password}
            onChangeText={(text)=> this.setState({password: text})}
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.login}
            onPress={() => this.log(this.state.email, this.state.password)}
        >
            <Text style={styles.boldtext}>Log in</Text>

        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      display: "flex",
      alignItems: "center",
  },
  center:{
    borderWidth:2,
    borderColor: "lightblue",
    width:"70%",
    borderRadius: '9999rem',
    marginTop:30,
    heigth: 20,
    textAlign:'center',
},
login:{
    marginTop:15,
    marginBottom:30,
    borderWidth:2,
    width:"18%",
    borderRadius: '9999rem',
    paddingBottom: 2,
    textAlign:'center',
    backgroundColor:"lightblue",
},
boldtext:{
    fontWeight:'bold',
}
})