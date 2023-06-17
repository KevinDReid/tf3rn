import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
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
<View style={{flex:1}}>
  <Text> {this.state.user.length > 0 ? this.state.user[0].data.bio : ''} </Text>
  <Logout navigation={this.props.navigation}/>
        <section style={styles.cardSection}>
        {
  this.state.loading ?
  <ActivityIndicator size='large' color='blue'/> : (
    <FlatList 
      data={this.state.posts}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({ item }) => (
        <Card
          id={item.id}
          myLike={item.data.whoLiked.some(email => email == auth.currentUser.email)}
          navigation={this.props.navigation}
          email={item.data.owner}
          profImg={item.data.profImg}
          img={item.data.photo}
          desc={item.data.descript}
          likes={item.data.likes}
          commentNumber={this.state.comments}
        />
      )}
    />
  ) 
}
        </section>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardSection: {
    overflow:'auto',
    display: "flex",
    justifyContent: "center",
  },
});

