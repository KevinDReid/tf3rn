import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'

export default class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            userMail: '',
            username: '',
            userPassword:'',
            pfp:'',
            userBio:''
        }
    }

    newUser(mail, password){
        auth.createUserWithEmailAndPassword(mail, password)
        .then( data => {
            
            db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now(),
                username: this.state.username,
                password: this.state.userPassword,
                pfp: this.state.pfp,
                bio: this.state.userBio
            })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return (
          <View style={styles.container}>
            <TextInput style={styles.center}
                placeholder='Your email, NOW'
                keyboardType='email-address'
                onChangeText={(text)=> this.setState({userMail: text}) }
                value={this.state.userMail}
            />
            <TextInput style={styles.center}
                placeholder='username'
                onChangeText={(text)=> this.setState({username: text}) }
                value={this.state.username}
            />
            <TextInput style={styles.center}
                placeholder='Password here please'
                onChangeText={(text) => this.setState({userPassword: text})}
                value={this.state.userPassword}
                secureTextEntry={true}
            />
            <TextInput style={styles.center}
                placeholder='Profile Picture link'
                onChangeText={(text) => this.setState({pfp: text})}
                value={this.state.pfp}
            />
            <TextInput style={styles.center}
                placeholder='Bio'
                onChangeText={(text) => this.setState({userBio: text})}
                value={this.state.userBio}
            />
            <TouchableOpacity style={styles.register}
                onPress={()=> this.newUser(this.state.userMail, this.state.userPassword)}
            >
                <Text style={styles.boldtext}>Register</Text>
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
        marginTop:30,
        heigth: 20,
        textAlign:'center',
    },
    register:{
        marginTop:15,
        marginBottom:30,
        borderWidth:2,
        width:"18%",
        paddingBottom: 2,
        textAlign:'center',
        backgroundColor:"lightblue",
    },
    boldtext:{
        fontWeight:'bold',
    }
  })
