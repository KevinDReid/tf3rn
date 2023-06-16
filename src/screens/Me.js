import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { db } from '../firebase/config'
import Logout from '../components/me/Logout'
import Card from '../components/card/Card'

export default class Me extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      loading: true
    }
  }
  componentDidMount(){
    db.collection('users').onSnapshot(
      docs => {
        let usersArray = []

        docs.forEach(doc => usersArray.push({
          id: doc.id,
          data: doc.data()
        }))

        this.setState({
          users: usersArray,
          loading: false
        })
      }
      )
}


  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Logout navigation={this.props.navigation}/>
        <FlatList 
        data={this.state.users}
        keyExtractor={(item) => item.id.toString}
        renderItem={({item})=> <Text>{item.data.username}</Text>}/>
      </View>
    )
  }
}
