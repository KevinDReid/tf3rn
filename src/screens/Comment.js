import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {db, auth} from '../firebase/config'
import Comment from '../components/comment/Comment'
import CommentInput from '../components/comment/CommentInput'
export default class CommentScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            comments: [],
            loading: true,
            text: '',
            userImg: ''
        }
    }
    componentDidMount(){
        db.collection('users').where('username', '==', 'tralala').onSnapshot(
            docs =>{
                let userImages=[]
                docs.forEach(
                    doc=> {
                        userImages.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                    )
                this.setState({
                    userImg: userImages[0].data.pfp
                })
            
        }
        )
        db.collection('comments').orderBy('created_at', 'desc').where('idPost', '==', this.props.route.params.idPost).onSnapshot(
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
                console.log(comments);
            }
        )

    }


    render() {
    return (
      <View  style={{height:700}}>
        <section style={styles.commentSection}>
        <FlatList
        data={this.state.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <Comment username={item.data.username} 
            comment={item.data.text}/>)}
        />
     
        </section>    

        <CommentInput idPost={this.props.route.params.idPost}/>    
      </View>
    )
  }
}
const styles = StyleSheet.create({
    commentInput:{
        backgroundColor:'red'
    },
    commentSection:{
        height:'100%'
    },
    createComment:{
        bottom:0,
        alignSelf:'flex-end',
        position:'absolute',
        display:'flex',
    },
})