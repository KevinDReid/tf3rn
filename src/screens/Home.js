import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Card from "../components/card/Card";

export default class Home extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    db.collection('comments').where('idPost', '==', this.props.route.params.idPost).onSnapshot(
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
    const items = [
      {
        username: "ckqueby",
        profImg:
          "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
        img: "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:"0"
           },
      {
        username: "asdas",
        profImg: "https://cdn-icons-png.flaticon.com/512/1088/1088537.png",
        img: "https://cdn-icons-png.flaticon.com/512/1088/1088537.png",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet,",
        comments: 2,
        id:"1"
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:"2"
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:"3"
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:"4"
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:5
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: 2,
        id:6
      },
    ];
    console.log(items);
    return (
      <View style={{flex:1}}>
        <section style={styles.cardSection}>
          <FlatList 
            data={items}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                navigation={this.props.navigation}
                username={item.username}
                profImg={item.profImg}
                img={item.img}
                desc={item.desc}
                likes={item.likes}
                comments={item.comments}
              />

            )}


          />
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
