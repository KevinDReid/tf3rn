import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
export default class Card extends Component {
    constructor(props){
        super(props)
        this.state={
            username: this.props.username,
            img: this.props.img,
            likes: this.props.likes,
            comments: this.props.comments
        }
    }

  render() {
    return (
      <View>
        <article style={styles.cardContainer}>
        <Text>{this.state.username}</Text>
        <img style={styles.cardImg} src={this.state.img} />
        <Text>Likes: {this.state.likes}</Text>
        <Text>Comments: {this.state.comments}</Text>
        </article>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    cardContainer:{
        width:'80%',
        border: '1px solid gray',
        borderRadius: 6
    },
    cardImg:{
        width:'100%'
    }
})