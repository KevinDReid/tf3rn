import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import Comment from "../../screens/Comment";
import { NavigationContainer } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      profImg: this.props.profImg,
      img: this.props.img,
      description: this.props.desc,
      likes: this.props.likes,
      comments: this.props.comments,
      fullText: false,
    };
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
            <Text style={{ fontSize: 13 }}>{this.state.username}</Text>
          </div>
          <Image
            style={styles.cardImg}
            source={{ uri: this.state.img }}
            resizeMode="cover"
          />
          <div style={styles.postButtons}>
            <AntDesign
              name="hearto"
              size={24}
              color="black"
              style={styles.likeButton}
            />
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
                {console.log(this.state.description.split(" ").length)}
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Comment")}
            >
              <Text>{this.state.comments} Comments</Text>
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
});
