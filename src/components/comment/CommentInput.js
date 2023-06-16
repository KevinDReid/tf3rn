import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { db, auth } from '../../firebase/config'
export default class CommentInput extends Component {
    constructor(props){
        super(props)
        this.state={
            text: '',
            commentatorUsername:'',
            loading:true
        }
    }
    componentDidMount(){

        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                docs.forEach(
                    doc=> {
                        console.log(doc);
                        this.setState({
                            commentatorUsername: doc.data().username
                        })
                    }
                    )
                
            })

    }
    onSubmit(){
        
        db.collection('comments').add(
            {
                username: this.state.commentatorUsername,
                text:this.state.text,
                created_at: Date.now(),
                idPost:this.props.idPost
            }
        ).then(
            this.setState({loading:false})
        ).catch(error =>
            console.log(error))
    }
  render() {
    
    return (
      <View>
        <div style={styles.createComment}>
            <TextInput style={styles.commentInput}
            keyboardType='default'
            placeholder='Add a comment'
            onChangeText={(text)=> this.setState({text:text})}/>
            <TouchableOpacity style={styles.commentButton} onPress={()=> this.onSubmit()}>
                <Text style={{color:'white'}}>Comment</Text>
            </TouchableOpacity>
        </div>    

      </View>
    )
  }
}
const styles = StyleSheet.create({
    commentInput:{
        backgroundColor:'#D3D0D0',
        border:'1px solid gray',
        width:'75%',
        borderRadius: '9999rem',
        padding: 5,
        textAlign:'center'
    },
    commentButton:{
        border:'1px solid gray',
        borderRadius: 8,
        padding: 5,
        textAlign:'center',
        backgroundColor:'black',
        width:'20%',
    },
    createComment:{
        width:'100%',
        bottom:0,
        alignSelf:'flex-end',
        position:'absolute',
        display:'flex',
        justifyContent:'space-around'
    },
})