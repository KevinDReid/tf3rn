import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Card from "../components/card/Card";

export default class Home extends Component {
  render() {
    const items = [
      {
        username: "ckqueby",
        profImg:
          "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
        img: "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: "2",
      },
      {
        username: "asdas",
        profImg: "https://cdn-icons-png.flaticon.com/512/1088/1088537.png",
        img: "https://cdn-icons-png.flaticon.com/512/1088/1088537.png",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet,",
        comments: "2",
      },
      {
        username: "eeeasd",
        profImg:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1",
        likes: "1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec aliquet ipsum. Vivamus cursus, dolor in scelerisque faucibus, lectus risus commodo ligula, a suscipit diam ipsum ac leo. Sed quis nisi non mi tincidunt pellentesque sed quis lorem. Nunc vulputate eu turpis sed iaculis. Maecenas ut nulla non neque mattis pulvinar ac vel ex. Donec viverra tincidunt dui, in faucibus libero ultrices ac. Aenean viverra, massa ac pretium tristique, ex enim fringilla felis, vel aliquam eros nibh sit amet risus. Integer ac felis sapien.",
        comments: "2",
      },
    ];
    return (
      <View>
        <section style={styles.cardSection}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
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
    display: "flex",
    justifyContent: "center",
  },
});
