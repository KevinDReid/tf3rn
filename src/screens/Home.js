import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import Card from "../components/card/Card";
import { db,auth } from "../firebase/config";
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      comments:[],
      loading: true
    }
  }
  componentDidMount(){
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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

    console.log(auth.currentUser.email);

    return (
      <View style={{flex:1}}>
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
          profImg={item.data.pfp}
          img={item.data.photo}
          desc={item.data.descript}
          likes={item.data.likes}
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
