// #Perdón
import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import Comment from "../../screens/Comment";
import { NavigationContainer } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db,auth } from "../../firebase/config";
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked:false,
      username: this.props.username,
      profImg: this.props.profImg,
      img: this.props.img,
      description: this.props.desc,
      likes: this.props.likes,
      commentNumber: this.props.commentNumber,
      fullText: false,
    };
  }
  componentDidMount(){
    let posts = db.collection('posts').where('id', '==', this.props.id)
    posts.onSnapshot(
      docs=>{
        let likes = []
        docs.forEach(

            doc =>{
                
                likes.push({
                    id: doc.id,
                    data: doc.data().whoLiked
                })
                
            }
        )
        if(likes.includes(auth.currentUser.email)){
          this.setState({
            isLiked:true
          })

        }else{
          this.setState({
            isLiked:false
          })
        }
        })}
  
  like(){

    db.collection('posts').where('id', '==', this.props.id).onSnapshot(
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
    // db.collection('posts').where('idPost', '==', this.props.id).onSnapshot(
    //   docs=>{
    //     let likes = []
    //     docs.forEach(
    //         doc=>
    //         console.log(doc)
    //       )
    //     docs.forEach(

    //         doc =>{
    //             likes.push({
    //                 id: doc.id,
    //                 data: doc.data().whoLiked
    //             })
                
    //         }
    //     )
    //     console.log(likes);
    //     if(likes.some(item => item.data.includes(auth.currentUser.email))){
    //       userId = likes.filter((el)=> {return el == auth.currentUser.email})
    //       this.setState({
    //         isLiked:false
    //       })
    //       likes.filter((el)=> {return el.data !=auth.currentUser.email})
    //       db.collection('posts').doc(this.props.id).update({
    //         whoLiked: likes
    //       })
    //     }else{
    //       this.setState({
    //         isLiked:true
    //       })
    //       likes.push(auth.currentUser.email)
    //       console.log(likes);
    //       db.collection('posts').doc(this.props.id).update({
    //         whoLiked: likes
          // }
          // )
        }

        
    // }

    // )
    // this.setState({isLiked:true})
  // }
  changeText(e) {
    if (this.state.fullText) {
      this.setState({
        fullText: false,
      });
    } else {
      this.setState({
        fullText: true,
      });
    }
  }
  render() {
    return (
      <View>
        <article style={styles.cardContainer}>
          <div style={styles.topSide}>
            <div style={styles.profImgCont}>
              <Image
                style={styles.postProfImg}
                source={{ uri: this.state.profImg }}
              />
            </div>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile", {username:this.state.username})}>

            <Text style={{ fontSize: 13 }}>{this.state.username}</Text>
            </TouchableOpacity>
          </div>
          <Image
            style={styles.cardImg}
            source={{ uri: this.state.img }}
            resizeMode="cover"
          />
          <div style={styles.postButtons}>
            <TouchableOpacity onPress={()=>this.like()}>
              {
                this.state.isLiked ?
                <AntDesign name="heart" size={24} color="black" /> :
            <AntDesign
            name="hearto"
            size={24}
            color="black"
            style={styles.likeButton}
            />
          }
              </TouchableOpacity>
            <FontAwesome5 name="comment" size={24} color="black" />
          </div>
          <div style={styles.postInfo}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Like")}
            >
              <Text>{this.state.likes} Likes </Text>
            </TouchableOpacity>

            {this.state.fullText ? (
              <>
                <Text>{this.state.description}</Text>
                {this.state.description.split(" ").length > 15 ? (
                  <TouchableOpacity onPress={(e) => this.changeText(e)}>
                    <Text style={{ fontWeight: "bold" }}>Less</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : (
              <>
                <Text>
                  {this.state.description.split(" ").slice(0, 15).join(" ")}
                  ... &#160;
                  {this.state.description.split(" ").length > 15 ? (
                    <TouchableOpacity onPress={(e) => this.changeText(e)}>
                      <Text style={{ fontWeight: "bold" }}>More</Text>
                    </TouchableOpacity>
                  ) : null}
                </Text>
              </>
            )}
          <FlatList
                   data={this.props.firstComments}
                   keyExtractor={(item,index) => index.toString()}
                   renderItem={({ item }) => (<div style={styles.firstComments}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Profile", {username: item.data.username})}>
                    <Text style={{fontWeight:'bold'}}>{item.data.username} </Text>
                    </TouchableOpacity>
                    <Text>{item.data.text}</Text>
                   </div>
                   )

                  }
          />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Comment", {idPost: this.props.id})}
            >
              <Text>{this.state.commentNumber} Comments</Text>
            </TouchableOpacity>
          </div>
        </article>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    width: 414,
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  topSide: {
    height: 34,
    display: "flex",
    alignItems: "center",
    width: "90%",
    marginLeft: 8,
    marginBottom: 6,
  },
  cardImg: {
    width: 414,
    height: 250,
  },
  postButtons: {
    marginTop: 4,
    marginBottom: 4,
  },
  likeButton: {
    marginLeft: 8,
    marginRight: 12,
  },
  postInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "90%",
    marginLeft: 8,
  },
  profImgCont: {
    display: "inline-block",
    width: 30,
    height: 30,
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: 4,
  },
  postProfImg: {
    overflow:'visible',
    height: "100%",
    width: "auto",
  },
  firstComments:{
    display:'flex'

  }
});
