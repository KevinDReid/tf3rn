import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Ourcamera from '../components/create/Ourcamera'
import Post from '../components/create/Post'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            descript: '',
            photo:'',
            likes:[],
            comments:[]
        }
    }

    newDesc(text){
        this.setState({
            descript: text
        })
    }

    newPic(picLink){
        this.setState({
            photo: picLink
        })
    }

    newPost({descript, photo, likes, comments}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            descript: descript,
            photo: photo,
            likes: likes,
            comments: comments,
            createdAt: Date.now(),
            whoLiked:[]
        })
        .then((resp)=>{
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
        <View style={styles.container}>
            {
                this.state.photo === '' ?
                <Ourcamera
                    newPic={
                        (picLink)=> this.newPic(picLink)
                    }
                />
                :
                <>
                    <Post stateDesc={this.state.descript} newDesc={(text) => this.newDesc(text) } />
                    <TouchableOpacity
                        onPress={()=> this.newPost({
                            descript:this.state.descript,
                            photo:this.state.photo,
                            likes: this.state.likes,
                            comments:this.state.comments
                        })}
                    >
                        <Text>Post</Text>
                    </TouchableOpacity>
                </>
                
            }
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container:{
      flex:1
  }
})