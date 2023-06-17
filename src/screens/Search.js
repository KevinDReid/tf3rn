import React, { Component } from 'react'
import { Text, View, TextInput, FlatList } from 'react-native'
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
        .filter(user =>{user.data.username.toLowerCase()
        .includes(willFilter.toLowerCase)})
        this.setState({users:filteredUsers})
    }

    render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <TextInput
          placeholder='wanna search?'
          onChangeText={(text)=> this.filter(text)}
        
        />
        <FlatList 
        data={this.state.users}
        keyExtractor={item => item.id.toString()}
        renderItem = {({item})=><Text>{item.data.username}</Text>}
        />
      </View>
    )
    }
}
