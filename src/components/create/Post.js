import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Post extends Component {
    constructor(props){
        super(props)
    }
  
    render() {
        return (
        <View>
            <TextInput
            style={styles.input}
            keyboardType='default'
            value={this.props.stateDesc}
            placeholder='Share your thoughts!'
            onChangeText={ (text) => this.props.newDesc(text) }
            multiline={true}
            rows={5}  
            />
        </View>
        )
    }
}