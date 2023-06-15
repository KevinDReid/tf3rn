import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Profile extends Component{

    constructor(props) {
        super(props)
        this.state = {
            infoUser: '',
            userPosts: []
        }
    }
    CompponentDidMount(){
        db.collection('users')
        .where('owner', '==', this.props.route.params.username)
        .onSnapshot(docs => {
            let userArray = []
            docs.forEach(doc => userArray.push({
                id: doc.id,
                data: doc.data
            }))

            this.setState({infoUser: userArray[0]})
        })
        db.collection('posts')
        .where('owner', '==', this.props.route.params.username)
        .onSnapshot(docs => {
            let postsArray = []
            docs.forEach(doc => postsArray.push({
                id: doc.id,
                data: doc.data()
        }))
        this.setState({infoPosts: postsArray})
    })
    }


    render() {
        return (
            <View>
                {
                    this.state.infoUser !== '' ?
                    <>
                    <Text>{this.state.infoUser.data.username}</Text>
                    <Text>{this.state.infoUser.data.bio}</Text>
                    </>
                   :
                   null 
                }
            </View>
        )
    }
}