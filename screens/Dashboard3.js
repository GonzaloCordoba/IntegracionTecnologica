import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Alert} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {savePublication, getImageUri} from '../database/api';
import * as ImagePicker from 'expo-image-picker';


export default class Dashboard3 extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = firebase.auth().currentUser;
        this.state={
            userId:currentUser.uid, 
        }
        
    }   
    render(){
        return(
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                    <View>
                        <Text>Hola</Text>
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