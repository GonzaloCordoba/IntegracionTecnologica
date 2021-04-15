import React,{ useState  } from 'react';
import {View,Text,TextInput,StyleSheet, Button,ImageBackground,Card,CardItem,Body,Alert} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {getPublication} from '../database/api';

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = firebase.auth().currentUser;
        
        this.state={
            userId: currentUser.uid,
            dataPub:[],
            img: ""
        }
        
    }

    // getImageUri = async () =>{
    //      this.state.dataPub.forEach((pub) => {
    //          firebase
    //          .storage()
    //          .ref(`images/${pub.userId}`)
    //          .getDownloadURL()
    //          .then(resolve => {
    //              console.log(pub);
    //              this.state.dataPub.push({
    //                  uri:resolve
    //              })
    //          }) 
    //          .catch(error => {
    //              console.log(error);
    //          });
    //      })  
    //  }

    onPressHandler= async () =>{
        getPublication(this.state.userId)
        .then((resolve)=>
            this.setState({dataPub:resolve}),
            
         )
        console.log(this.state.dataPub);
       
    }
    onPressHandler2 = async () => {
        try {
           
            const db = firebase.firestore();
                 
            db.collection('publications').where("userId","!=",this.state.userId)
              .onSnapshot((querySnapshot)=>{
                        const pub = [];
                  querySnapshot.forEach((doc)=>{ 
                      const {nameAuthorBook,stateBook,nameBook,userId}=doc.data();
                      firebase
                        .storage()
                        .ref(`images/${doc.data().userId}`)
                        .getDownloadURL()
                        .then(resolve => {
                        //console.log(resolve);
                        pub.push({
                            idPublicacion:doc.id,
                            nameAuthorBook,
                            stateBook,
                            nameBook,
                            userId,
                            uri:resolve
                        })
                        
                        //console.log(pub)
                        this.setState({dataPub:pub})      
                        
                    })
                    
                    .catch(error => {
                    console.log(error);
                    });
                        //console.log(doc.id,"=>",doc.data())
                         
                     
                    
                  })
                 
              })
        } 
        catch (err) {
            Alert.alert('There is something wrong!', err.message);
         }       
    }
    render(){
        //console.log(this.state.dataPub)
        
        const p = this.state.dataPub;
        const d = JSON.stringify(this.state.dataPub);
        if(this.state.dataPub === undefined || this.state.dataPub === null || this.state.dataPub === 0 || this.state.dataPub === '' || this.state.dataPub ===[]){
            return(
                <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                    <Text>No hay datos...</Text>
                </ScrollView>
            </ImageBackground>      
            );        
        }else{
            return(
               <ImageBackground
                    style={styles.background}
                    source={require('../assets/background.jpg')}> 
                    <ScrollView style={styles.container}>
                        <View style={styles.inputGroup}>
                            <Button title="VER PUBLICACION" onPress={this.onPressHandler.bind(this)}/>
                        </View>
                   
                        
                    </ScrollView>
                </ImageBackground> 
            );
        }
        // return(
        //     <ImageBackground
        //         style={styles.background}
        //         source={require('../assets/background.jpg')}> 
        //         <ScrollView style={styles.container}>
        //             <View style={styles.inputGroup}>
        //                 <Button title="VER PUBLICACION" onPress={this.onPressHandler.bind(this)}/>
        //             </View>
               
                    
        //         </ScrollView>
        //     </ImageBackground>  
        // );
    }  

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        marginTop:1
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