import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { db } from '../firebase/config'
import Logout from '../components/me/Logout'

export default class Me extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: [],
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
          user: usersArray,
          loading: false
        })
      }
      )
}


  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Logout navigation={this.props.navigation} />
        <FlatList 
        data={this.state.user}
        keyExtractor={(item) => item.id.toString}
        renderItem={({item})=> <Text>{item.data.owner}</Text>}/>
      </View>
    )
  }
}
