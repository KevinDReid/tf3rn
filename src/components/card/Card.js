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
      profImg: this.props.profImg,
      img: this.props.img,
      description: this.props.desc,
      likes: this.props.likes,
      commentNumber: this.props.commentNumber,
      fullText: false,
      username:''
    };
  }
  componentDidMount(){
    console.log(this.props.email);
    db.collection('users').where('email', '==', this.props.email).onSnapshot(
      docs=>{
        docs.forEach(

            doc =>{
              
              this.setState({
                username: doc.data().username
              })
                
            }
        )}
    )
    if(this.props.myLike == true){
      this.setState({
      isLiked:true   
      })
    }
    console.log(this.props.myLike);
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
        let likes = []
        docs.forEach(
            doc=>
            console.log(doc)
          )
        docs.forEach(

            doc =>{
                likes.push({
                    id: doc.id,
                    data: doc.data()
                })
                
            }
        )
        console.log(auth.currentUser);
        let likeArr = likes[0].data.whoLiked
        let postId = likes[0].id
        if(likeArr.some(item => item.includes(auth.currentUser.email))){
          let usersLiked = likeArr.filter((el)=> {return el != auth.currentUser.email})
 
        }else{
          this.setState({
            isLiked:true
          })
          likeArr.push(auth.currentUser.email)
          console.log(likeArr);
          db.collection('posts').doc(postId).update({
            whoLiked: likeArr
          }
          )
        }
        console.log(this.state.isLiked)

        
    }

    )
  }
  disLike(){
    db.collection('posts').where('id', '==', this.props.id).onSnapshot(
      docs=>{
     let likes = []
     docs.forEach(
         doc=>
         console.log(doc)
       )
     docs.forEach(

         doc =>{
             likes.push({
                 id: doc.id,
                 data: doc.data()
             })
             
         }
     )}
     
     ).then(
      ()=>{
        this.setState({
          isLiked:false
        })
        db.collection('posts').doc(postId).update({
          whoLiked: usersLiked
        })
      }
     )
  }
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
              {
                this.state.isLiked ?
            <TouchableOpacity onPress={()=>this.like()}>
              <AntDesign name="heart" size={24} color="black" />
              </TouchableOpacity>
                 :
            <TouchableOpacity onPress={()=>this.disLike()}>
            <AntDesign
            name="hearto"
            size={24}
            color="black"
            style={styles.likeButton}
            />
              </TouchableOpacity>
          }
            <FontAwesome5 name="comment" size={24} color="black" />
          </div>
          <div style={styles.postInfo}>
              <Text>{this.state.likes} Likes </Text>

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
