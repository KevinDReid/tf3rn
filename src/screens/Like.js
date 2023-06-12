import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {db} from '../firebase/config'
export default class Like extends Component {
    constructor(props){
        super(props)
        this.state={
            comments: [],
            loading: true
        }
    }
    componentDidMount(){
        db.collection('comments').onSnapshot(
            docs=>{
                let comments = []
                docs.forEach(
                    doc =>{
                        comments.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                )
                this.setState({
                    comments: comments,
                    loading: false
                })
            }
        )

    }
    render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
