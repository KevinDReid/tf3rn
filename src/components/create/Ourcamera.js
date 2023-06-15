import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'


export default class Ourcamera extends Component {
    constructor(props){
        super(props)
        this.state ={
            showCamera: false,
            photo: ''
        }
        this.cameraFunction = null
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(resp => this.setState({showCamera: true}))
        .catch(err => console.log(err))

    }

    takePic(){
        this.cameraFunction.takePictureAsync()
        .then(fotoEnMemoria => {
            this.setState({
                photo: fotoEnMemoria.uri,
                showCamera: false
            })
        })
        .catch(err => console.log(err))
    }

    accept(){
        fetch(this.state.photo)
        .then(resp => resp.blob())
        .then(imagen => {
            const ref = storage.ref(`photo/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=> this.props.newPic(url))
            })

        })
        .catch(err => console.log(err))
    }

    retake(){
        this.setState({
            showCamera: true,
            photo:''
        })
    }


    render() {
        return (
        <View style={styles.container}>
            {
                this.state.showCamera && this.state.photo === '' ?
                <>
                    <Camera style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={(heheheyup) => this.cameraFunction = heheheyup}
                    ratio='16:9'
                    /> 
                    <TouchableOpacity
                    onPress={()=> this.takePic()}
                    >
                        <Text>
                            Tomar foto
                        </Text>
                    </TouchableOpacity>
                </>
                : this.state.showCamera === false && this.state.photo !== '' ?
                <>
                    <Image style={styles.img}
                        source={{uri: this.state.photo}}
                    />
                    <View>
                        <TouchableOpacity
                        onPress={()=> this.accept()}
                        >
                            <Text>
                                Upload pic
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> this.retake()}
                        >
                            <Text>
                                Retake
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <Text>Need permision to use camera</Text>
            }
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