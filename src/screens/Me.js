import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { db, auth } from '../firebase/config';
import Logout from '../components/me/Logout';
import Card from "../components/card/Card";

export default class Me extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: [],
      loading: true,
      posts: [],
    }
  }
  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
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

      db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'asc').onSnapshot(
        docs=>{
          let posts = []
          docs.forEach(

              doc =>{
                  
                  posts.push({
                      id: doc.id,
                      data: doc.data()
                  })
                  
              }
          )
          console.log(posts);
          this.setState({
              posts: posts,
              loading: false
          })
      }
  )
}


  render() {
    return (
      <View><>
      {
          this.state.loading ? <ActivityIndicator size='large' color='blue'/> :<>
          <section style={styles.topside}>

          <div style={styles.profilePicCont}>

          <Image source={{uri:this.state.user[0].data.pfp}} style={styles.profilePic} resizeMode='contain'/>
          </div>
      <div style={styles.info}>

          <Text style={{fontSize:25, fontWeight:'bold',}}>{this.state.user[0].data.username}</Text>
          <Text> {this.state.user.length > 0 ? this.state.user[0].data.bio : ''} </Text>
          <Logout navigation={this.props.navigation}/>
      </div>
      </section>
          <FlatList data={this.state.posts} 
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item }) => (
              <Card
              id={item.id}
              myLike={item.data.whoLiked.some(email => email == auth.currentUser.email)}
              navigation={this.props.navigation}
              email={item.data.owner}
                  profImg={item.data.pfp}
                  img={item.data.photo}
                  desc={item.data.descript}
                  likes={item.data.likes}
                  />
                  )}
                  />
                  
                  </>
} 
</>
</View>
                  )}
              }
let styles = StyleSheet.create({
profilePic:{
overflow:'visible',
height: "100%",
width: "auto",

},
profilePicCont:{
width:100,
height:100,
borderRadius:'50%',
display: "inline-block",
overflow: "hidden",
},
topside:{
display:'flex',
justifyContent:'space-around',
marginTop:10,
marginBottom:10
},
info:{
display:'flex',
flexDirection:'column',
justifyContent:'center'
}
})