import { Text, Image, View, TextInput, TouchableOpacity, StyleSheet, LogBox, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db,auth } from '../firebase/config'
import Card from '../components/card/Card'
export default class Profile extends Component{

    constructor(props) {
        super(props)
        this.state = {
            infoUser: [],
            userPosts: [],
            loading:true
        }
    }
    componentDidMount(){
        db.collection('users')
        .where('username', '==', this.props.route.params.username)
        .onSnapshot(docs => {
            let userArray = []
            let postsArray = []
            docs.forEach(
                doc => {
                    userArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({infoUser: {username:doc.data().username, bio:doc.data().bio, pfp: doc.data().pfp}})
                    console.log(doc.data());
                    db.collection('posts').where('owner', '==', doc.data().owner).onSnapshot(docs => {
            
                        docs.forEach(doc => {
                            console.log(doc);
                            postsArray.push({
                            id: doc.id,
                            data: doc.data()
                    })})
                    this.setState({infoPosts: postsArray, loading:false})
                })
                })      })}      

        

    render() {
        console.log(this.state.infoUser.pfp);
        return (
            <View><>
                {
                    this.state.loading ? <ActivityIndicator size='large' color='blue'/> :<>
                    <section style={styles.topside}>

                    <div style={styles.profilePicCont}>

                    <Image source={{uri:this.state.infoUser.pfp}} style={styles.profilePic} resizeMode='contain'/>
                    </div>
                <div style={styles.info}>

                    <Text style={{fontSize:25, fontWeight:'bold',}}>{this.state.infoUser.username}</Text>
                    <Text>{this.state.infoUser.bio}</Text> 
                </div>
                </section>
                    <FlatList data={this.state.infoPosts} 
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