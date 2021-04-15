import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Alert} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {savePublication} from '../database/api';
import * as ImagePicker from 'expo-image-picker';


export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = firebase.auth().currentUser;
        this.state={
            userId:currentUser.uid ,
            nameBook:""  ,
            nameAuthorBook:"",
            stateBook:"",
            uri:""
        }
        
    }

    uploadImage = uri => {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.onerror = reject;
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              resolve(xhr.response);
            }
          };
    
          xhr.open("GET", uri);
          xhr.responseType = "blob";
          xhr.send();
        });
    };
    
    openGallery = async () => {
        const  resultPermission  = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (resultPermission) {
            const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3]
        });
        
            if (resultImagePicker.cancelled === false) {
                const imageUri = resultImagePicker.uri;
                this.uploadImage(imageUri)
            .then(resolve => {
                let ref = firebase
                .storage()
                .ref()
                .child(`images/${this.state.userId}`);
                ref
                .put(resolve)
                .then(resolve => {
                    console.log("Imagen subida correctamente");
                })
                .catch(error => {
                    console.log("Error al subir la imagen");
                });
            })
            .catch(error => {
                console.log(error);
            });
            }
        }
    };
    Publication = async () =>{
        
        savePublication(
            this.state.nameBook,
            this.state.nameAuthorBook,
            this.state.stateBook,
            this.state.uri
        );
        this.state={
            userId:currentUser.uid ,
            nameBook:""  ,
            nameAuthorBook:"",
            stateBook:""
        }
    }   
    render(){
        return(
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                    <View style={styles.inputGroup}>  
                        <TextInput
                            placeholder="Titulo del libro" 
                            onChangeText={(value) =>  this.setState({nameBook: value})}
                        />
                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput
                            placeholder="Nombre del autor" 
                            onChangeText={(value) =>  this.setState({nameAuthorBook: value})}
                        />
                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput
                            placeholder="Estado del libro" 
                            onChangeText={(value) =>  this.setState({stateBook: value})}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Button title="Cargar Imagen" onPress={this.openGallery.bind(this)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Button title="PUBLICAR" onPress={this.Publication.bind(this)}/>
                    </View>
                </ScrollView>
            </ImageBackground>  
        );
    }  

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        marginTop:100
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'

     },
     titulo:{
         textAlign:'right'
     },
     background:{
        flex: 1
    
     }
})