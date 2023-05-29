import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Card from '../components/card/Card'

export default class Home extends Component {
  render() {
    return (
      <View>
        <section style={styles.cardSection}>
        <Card username='ckqueby' img='https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp' likes='1' comments='2'/>
        </section>
      </View>
    )
  }
}
