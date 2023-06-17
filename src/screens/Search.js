import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { db } from '../firebase/config'

export default class Search extends Component {
    constructor(props){
      super(props)
      this.state={
        searched:'',
        users:[],
        usersBackup:[]
      }
    }

    componentDidMount(){
      db.collection('users').onSnapshot(
        docs => {
          let usersArray = []
          docs.forEach(doc => {
            usersArray.push({
              id: doc.id,
              data: doc.data()
            })
          })
          this.setState({
            users:usersArray,
            usersBackup:usersArray
          })
        }
      )
    }

    filter(willFilter){
      let filteredUsers = this.state.usersBackup
        .filter(user =>user.data.username.toLowerCase()
        .includes(willFilter.toLowerCase()))
        this.setState({users:filteredUsers})
    }

    render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.center}
          placeholder='wanna search?'
          onChangeText={(text)=> this.filter(text)}
        
        />
        <FlatList
        data={this.state.users}
        keyExtractor={item => item.id.toString()}
        renderItem = {({item})=>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile", {username:item.data.username})}>
          <Text>{item.data.username}</Text>
          </TouchableOpacity>}
        />
        {console.log(this.state.users)}
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
      borderRadius: '9999rem',
      heigth: 20,
      textAlign:'center',
  },
})