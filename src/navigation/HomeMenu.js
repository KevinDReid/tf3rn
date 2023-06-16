import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import {navigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AntDesign } from '@expo/vector-icons'

import Home from '../screens/Home'
import Newpost from '../screens/Newpost'
import Search from '../screens/Search'
import Me from '../screens/Me'

import { auth, db } from '../firebase/config'

const Tab = createBottomTabNavigator()

class HomeMenu extends Component {
    constructor(props){
        super(props)
        this.state={
            profImg: ''
        }

    }
    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let userImages=[]
                docs.forEach(
                    doc=> {
                        userImages.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                    )
                    
                this.setState({
                    profImg: userImages[0].data.pfp
                })}
                )
    }
    render() {

        return (
            <Tab.Navigator
            >
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarIcon: () => <AntDesign name='home' size={24} />
                    }} />
        <Tab.Screen
            name='Search'
            component={Search}
            options={{
                tabBarIcon: () => <AntDesign name="search1" size={24} color="black" />
            }} />
                
        <Tab.Screen
            name='Create'
            component={Newpost}
            options={{
                tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="black" />
            }} />
        <Tab.Screen
            name='Me'
            component={Me}
            options={{
                tabBarIcon: () => <Image source={{uri:this.state.profImg}} style={{width:40, height:40, borderRadius:'50%'}}/>  
            }} />

            </Tab.Navigator>
        )
    }
}

export default HomeMenu