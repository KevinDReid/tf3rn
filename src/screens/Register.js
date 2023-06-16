import { Text, View, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/formregister/FormRegister'
import { auth } from '../firebase/config'


export default class Register extends Component {

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }
  render() {
    return (
      <View>
        <FormRegister navigation={this.props.navigation}/>
        <Text>
            Already a member? 
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Login')}
            >
                <Text>Click here.</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1
  },
  camera:{
      flex:1
  },
  img: {
      flex:1
  }
})