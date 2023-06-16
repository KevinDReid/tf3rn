import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { db } from '../../firebase/config'
export default class Comment extends Component {
    constructor(props){
        super(props)
        this.state={
            userImg: '',
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
                console.log(userImages[0].data.pfp);
                this.setState({
                    userImg: userImages[0].data.pfp
                })})
    }

  render() {
    return (
      <View>
        <article style={styles.commentCont}>

        <div style={styles.profImgComCont}>
              <Image
                style={styles.profImgCom}
                source={{ uri: this.state.userImg }}
                />
         </div>
            <div style={styles.commentator}>
        <TouchableOpacity>
           <Text><strong>
             {this.props.username}

           </strong>
             </Text>
        </TouchableOpacity>
        <Text>
            {this.props.comment}
        </Text>
                </div>
        </article>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    commentCont:{
        display:'flex',
        
        marginTop: 10,
        marginLeft: 10,
    },
    profImgComCont:{
    display: "inline-block",
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: "50%",
    border: '1px solid black',
    marginRight: 4,
},
    profImgCom:{
        height: "100%",
        width: "auto",
    },
    commentator:{
        display:'flex',
        flexDirection:'column'
    }

})